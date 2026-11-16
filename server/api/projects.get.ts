import { Octokit } from "@octokit/core";
import type { TopProject } from "#shared/types/projects";

interface BreakdownItem {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  text: string;
  hours: number;
  minutes: number;
  seconds: number;
}

interface UserStats {
  username: string;
  user_id: string;
  start: string;
  end: string;
  status: string;
  total_seconds: number;
  daily_average: number;
  days_including_holidays: number;
  range: string;
  human_readable_range: string;
  human_readable_total: string;
  human_readable_daily_average: string;
  is_coding_activity_visible: boolean;
  is_other_usage_visible: boolean;
  editors: BreakdownItem[];
  languages: BreakdownItem[];
  machines: BreakdownItem[];
  projects: BreakdownItem[];
  operating_systems: BreakdownItem[];
  categories: BreakdownItem[];
}

export interface WakatimeStatsResponse {
  data: UserStats;
}

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);
    const octokit = new Octokit({ auth: config.githubToken });

    const sevenDaysAgoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const sevenDaysAgoISO = sevenDaysAgoDate.toISOString();
    const sevenDaysAgoDateStr = sevenDaysAgoISO.split("T")[0];

    // List owned repos (private included) so visibility can be resolved without
    // fetching each repository's details individually.
    const fetchOwnedRepos = async () => {
      const repos: Array<{
        name: string;
        isPrivate: boolean;
        description: string | null;
        url: string | null;
      }> = [];

      for (let page = 1; page <= 10; page++) {
        const { data } = await octokit.request("GET /user/repos", {
          type: "owner",
          per_page: 100,
          page,
          sort: "updated",
        });

        for (const repo of data) {
          repos.push({
            name: repo.name,
            isPrivate: repo.private || repo.visibility !== "public",
            description: repo.description ?? null,
            url: repo.html_url ?? null,
          });
        }

        if (data.length < 100) break;
      }

      return repos;
    };

    // 1. Fetch GitHub User, owned repos & Hackatime Stats concurrently
    const [userRes, wakatimeRes, ownedRepos] = await Promise.all([
      octokit.request("GET /user").catch(() => null),
      $fetch<WakatimeStatsResponse>(
        "https://hackatime.hackclub.com/api/hackatime/v1/users/current/stats/last_7_days",
        {
          headers: {
            Authorization: `Bearer ${config.hackatimeApiKey}`,
            Accept: "application/json",
          },
        },
      ).catch(() => null),
      fetchOwnedRepos().catch(() => []),
    ]);

    const username = userRes?.data?.login;
    const projects = wakatimeRes?.data?.projects ?? [];
    const reposByName = new Map(ownedRepos.map((repo) => [repo.name, repo]));

    // 2. Fetch total commits & top project details concurrently
    const [commits, topProjects] = await Promise.all([
      // Total commit count search. Authenticated searches include private
      // repositories the token can access, so private commits are counted too.
      username
        ? octokit
            .request("GET /search/commits", {
              q: `author:${username} author-date:>=${sevenDaysAgoDateStr}`,
              headers: { "X-GitHub-Api-Version": "2022-11-28" },
            })
            .then((res) => res.data.total_count)
            .catch(() => 0)
        : Promise.resolve(0),

      // Process and enrich top 3 projects
      Promise.all(
        projects.slice(0, 3).map(async (project): Promise<TopProject> => {
          const totalHours = Math.round(project.total_seconds / 3600);

          if (!username) {
            return { name: project.name, totalHours, description: null, commitsLast7Days: 0 };
          }

          const knownRepo = reposByName.get(project.name);

          // Never fetch details of private repos: expose only name and hours.
          if (knownRepo?.isPrivate) {
            return { name: project.name, totalHours, description: null, commitsLast7Days: 0 };
          }

          try {
            let description: string | null;
            let url: string | null;

            if (knownRepo) {
              description = knownRepo.description;
              url = knownRepo.url;
            } else {
              // Fall back to the repo endpoint only when the repo was not listed
              // (e.g. it is owned by someone else).
              const { data: repo } = await octokit.request("GET /repos/{owner}/{repo}", {
                owner: username,
                repo: project.name,
              });

              if (repo.private || repo.visibility !== "public") {
                return { name: project.name, totalHours, description: null, commitsLast7Days: 0 };
              }

              description = repo.description ?? null;
              url = repo.html_url ?? null;
            }

            // Fetch commits for this specific public repo
            const { data: repoCommits } = await octokit.request(
              "GET /repos/{owner}/{repo}/commits",
              {
                owner: username,
                repo: project.name,
                author: username,
                since: sevenDaysAgoISO,
                per_page: 100,
              },
            );

            return {
              name: project.name,
              totalHours,
              description,
              commitsLast7Days: repoCommits.length,
              url,
            };
          } catch {
            return {
              name: project.name,
              totalHours,
              description: null,
              commitsLast7Days: 0,
              url: null,
            };
          }
        }),
      ),
    ]);

    return {
      commits,
      projects: projects.length,
      minutes: Math.round((wakatimeRes?.data?.total_seconds ?? 0) / 60),
      topProjects,
    };
  },
  {
    maxAge: 60 * 60,
    swr: true,
  },
);
