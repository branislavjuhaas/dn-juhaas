import type { TopProject } from "#shared/types/projects";
import { resolveGitHubAccounts, withGitHubAccounts } from "../utils/github";
import type { GitHubAccount } from "../utils/github";

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

interface RepoInfo {
  owner: string;
  name: string;
  fullName: string;
  isPrivate: boolean;
  description: string | null;
  url: string | null;
}

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);

    const sevenDaysAgoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const sevenDaysAgoISO = sevenDaysAgoDate.toISOString();
    const sevenDaysAgoDateStr = sevenDaysAgoISO.split("T")[0];

    // List accessible repos (private included) so visibility can be resolved
    // without fetching each repository's details individually. Collaborator
    // repos are included because a second token may see private repositories
    // that the primary token cannot.
    const fetchAccessibleRepos = async (account: GitHubAccount) => {
      const repos: RepoInfo[] = [];

      for (let page = 1; page <= 10; page++) {
        const { data } = await account.octokit.request("GET /user/repos", {
          affiliation: "owner,collaborator,organization_member",
          per_page: 100,
          page,
          sort: "updated",
        });

        for (const repo of data) {
          const isPrivate = repo.private || repo.visibility !== "public";

          repos.push({
            owner: repo.owner.login,
            name: repo.name,
            fullName: repo.full_name,
            isPrivate,
            // Never keep details of private repositories around.
            description: isPrivate ? null : (repo.description ?? null),
            url: isPrivate ? null : (repo.html_url ?? null),
          });
        }

        if (data.length < 100) break;
      }

      return repos;
    };

    // 1. Fetch GitHub accounts & Hackatime stats concurrently
    const [accounts, wakatimeRes] = await Promise.all([
      resolveGitHubAccounts([config.githubToken, config.githubTokenAster]),
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

    const usernames = accounts.map(({ login }) => login);
    const projects = wakatimeRes?.data?.projects ?? [];

    const repoLists = await Promise.all(
      accounts.map((account) => fetchAccessibleRepos(account).catch(() => [])),
    );
    const accessibleRepos = repoLists.flat();

    // Deduplicate by full name, then index by bare name because Hackatime
    // reports project names without an owner.
    const reposByFullName = new Map<string, RepoInfo>();
    for (const repo of accessibleRepos) {
      if (!reposByFullName.has(repo.fullName)) {
        reposByFullName.set(repo.fullName, repo);
      }
    }

    const reposByName = new Map<string, RepoInfo>();
    for (const repo of reposByFullName.values()) {
      const current = reposByName.get(repo.name);

      // Prefer a public entry, since only public entries carry details.
      if (!current || (current.isPrivate && !repo.isPrivate)) {
        reposByName.set(repo.name, repo);
      }
    }

    const searchCommitsTotal = async (query: string) => {
      const totals = await Promise.all(
        accounts.map((account) =>
          account.octokit
            .request("GET /search/commits", {
              q: query,
              headers: { "X-GitHub-Api-Version": "2022-11-28" },
            })
            .then((res) => res.data.total_count)
            .catch(() => 0),
        ),
      );

      // The same author is visible through every token, so take the widest
      // result instead of adding them up.
      return Math.max(0, ...totals);
    };

    const countCommitsLast7Days = async (repo: RepoInfo) => {
      const counts = await Promise.all(
        usernames.map(async (username) => {
          const commits = await withGitHubAccounts(accounts, async (octokit) =>
            octokit
              .request("GET /repos/{owner}/{repo}/commits", {
                owner: repo.owner,
                repo: repo.name,
                author: username,
                since: sevenDaysAgoISO,
                per_page: 100,
              })
              .then(({ data }) => data),
          );

          return commits?.length ?? 0;
        }),
      );

      return counts.reduce((total, count) => total + count, 0);
    };

    const resolveProjectRepo = async (name: string): Promise<RepoInfo | null> => {
      const knownRepo = reposByName.get(name);
      if (knownRepo) return knownRepo;

      for (const username of usernames) {
        const repo = await withGitHubAccounts(accounts, async (octokit) =>
          octokit
            .request("GET /repos/{owner}/{repo}", { owner: username, repo: name })
            .then(({ data }) => data),
        );

        if (repo) {
          const isPrivate = repo.private || repo.visibility !== "public";

          return {
            owner: repo.owner.login,
            name: repo.name,
            fullName: repo.full_name,
            isPrivate,
            description: isPrivate ? null : (repo.description ?? null),
            url: isPrivate ? null : (repo.html_url ?? null),
          };
        }
      }

      return null;
    };

    // 2. Fetch total commits & top project details concurrently
    const [commits, topProjects] = await Promise.all([
      // Total commit count across all accounts. Authenticated searches include
      // private repositories the tokens can access, so private commits are
      // counted too without revealing the repository.
      Promise.all(
        usernames.map((username) =>
          searchCommitsTotal(`author:${username} author-date:>=${sevenDaysAgoDateStr}`),
        ),
      ).then((totals) => totals.reduce((total, count) => total + count, 0)),

      // Process and enrich top 3 projects
      Promise.all(
        projects.slice(0, 3).map(async (project): Promise<TopProject> => {
          const totalHours = Math.round(project.total_seconds / 3600);
          const repo = await resolveProjectRepo(project.name);

          if (!repo) {
            return { name: project.name, totalHours, description: null, commitsLast7Days: 0 };
          }

          const commitsLast7Days = await countCommitsLast7Days(repo);

          // Never expose details of private repos, but still report their
          // commit count so private work is visible in the stats.
          return {
            name: project.name,
            totalHours,
            description: repo.isPrivate ? null : repo.description,
            commitsLast7Days,
            url: repo.isPrivate ? null : repo.url,
          };
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
