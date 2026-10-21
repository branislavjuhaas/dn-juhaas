import { Octokit } from "@octokit/core";

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

    // 1. Fetch GitHub User & Hackatime Stats concurrently
    const [userRes, wakatimeRes] = await Promise.all([
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
    ]);

    const username = userRes?.data?.login;
    const projects = wakatimeRes?.data?.projects ?? [];

    // 2. Fetch total commits & top project details concurrently
    const [commits, topProjects] = await Promise.all([
      // Total commit count search
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
        projects.slice(0, 3).map(async (project) => {
          const totalHours = Math.round(project.total_seconds / 3600);

          if (!username) {
            return { name: project.name, totalHours, description: null, commitsLast7Days: 0 };
          }

          try {
            // Check repo status
            const { data: repo } = await octokit.request("GET /repos/{owner}/{repo}", {
              owner: username,
              repo: project.name,
            });

            // Return basic info if private or non-existent
            if (repo.private || repo.visibility !== "public") {
              return { name: project.name, totalHours, description: null, commitsLast7Days: 0 };
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
              description: repo.description ?? null,
              commitsLast7Days: repoCommits.length,
            };
          } catch {
            return { name: project.name, totalHours, description: null, commitsLast7Days: 0 };
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
  },
);
