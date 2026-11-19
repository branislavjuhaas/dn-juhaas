import type { Contribution } from "#shared/types/contributions";
import { resolveGitHubAccounts, withGitHubAccounts } from "../utils/github";
import type { GitHubAccount } from "../utils/github";

const MIN_COMMITS_FILTER = 1;

interface RepoMeta {
  owner: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
}

interface AuthorCommitStats {
  commitsCount: number;
  firstCommitYear: number | null;
  lastCommitYear: number | null;
}

async function fetchAuthorStats(
  accounts: GitHubAccount[],
  repo: RepoMeta,
  username: string,
): Promise<AuthorCommitStats | null> {
  return withGitHubAccounts(accounts, async (octokit) => {
    // Fetch the most recent commit authored by the user in this repository.
    const { data: latest, headers } = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: repo.owner,
      repo: repo.name,
      author: username,
      per_page: 1,
    });

    if (!latest.length) return null;

    // Parse total commit count from pagination "Link" header.
    const link = headers.link ?? "";
    const lastPageMatch = link.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
    const commitsCount = parseInt(lastPageMatch?.[1] ?? String(latest.length), 10);

    if (commitsCount < MIN_COMMITS_FILTER) return null;

    const lastDate = latest[0]?.commit?.author?.date || latest[0]?.commit?.committer?.date;
    const lastCommitYear = lastDate ? new Date(lastDate).getFullYear() : null;

    let firstDate = lastDate;
    if (commitsCount > 1 && lastPageMatch) {
      const { data: oldest } = await octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: repo.owner,
        repo: repo.name,
        author: username,
        per_page: 1,
        page: commitsCount,
      });
      firstDate =
        oldest[0]?.commit?.author?.date || oldest[0]?.commit?.committer?.date || firstDate;
    }

    return {
      commitsCount,
      firstCommitYear: firstDate ? new Date(firstDate).getFullYear() : null,
      lastCommitYear,
    };
  });
}

export default defineCachedEventHandler(
  async (event): Promise<Contribution[]> => {
    const config = useRuntimeConfig(event);
    const accounts = await resolveGitHubAccounts([config.githubToken, config.githubTokenAster]);

    if (!accounts.length) {
      return [];
    }

    const usernames = accounts.map(({ login }) => login);

    // 1. Fetch owned repositories, authored commits and merged PRs per account.
    const perAccount = await Promise.all(
      accounts.map(async (account) => {
        const [reposRes, commitsRes, prsRes] = await Promise.all([
          account.octokit
            .request("GET /user/repos", {
              type: "all",
              per_page: 100,
              sort: "updated",
            })
            .catch(() => null),
          account.octokit
            .request("GET /search/commits", {
              q: `author:${account.login}`,
              per_page: 100,
              headers: { "X-GitHub-Api-Version": "2022-11-28" },
            })
            .catch(() => null),
          account.octokit
            .request("GET /search/issues", {
              q: `type:pr author:${account.login} is:merged`,
              per_page: 100,
            })
            .catch(() => null),
        ]);

        return {
          repos: reposRes?.data ?? [],
          commits: commitsRes?.data?.items ?? [],
          prs: prsRes?.data?.items ?? [],
        };
      }),
    );

    const repoMap = new Map<string, RepoMeta>();

    // Helper to register repositories safely.
    const addRepo = (meta: RepoMeta) => {
      if (!repoMap.has(meta.full_name)) {
        repoMap.set(meta.full_name, meta);
      }
    };

    const addRepoIfPublic = (repo: {
      owner: { login: string };
      name: string;
      full_name: string;
      html_url: string;
      description: string | null;
      fork: boolean;
      archived?: boolean;
      private: boolean;
    }) => {
      if (repo.fork || repo.archived || repo.private) return;

      addRepo({
        owner: repo.owner.login,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description ?? null,
      });
    };

    // 2a. Add owned non-fork, non-archived, public repositories.
    // 2b. Add public repositories discovered from commit search.
    for (const result of perAccount) {
      for (const repo of result.repos) {
        addRepoIfPublic(repo);
      }

      for (const item of result.commits) {
        if (item.repository) {
          addRepoIfPublic(item.repository);
        }
      }
    }

    // 2c. Add public, non-archived repositories discovered via merged PRs.
    const prRepositories = new Map<string, { owner: string; name: string }>();
    for (const result of perAccount) {
      for (const pr of result.prs) {
        if (!pr.repository_url) continue;

        // Extract owner and repo name from api URL ("https://api.github.com/repos/owner/repo").
        const urlParts = pr.repository_url.split("/");
        const name = urlParts.pop();
        const owner = urlParts.pop();
        if (owner && name) prRepositories.set(`${owner}/${name}`, { owner, name });
      }
    }

    const prRepoMetas = await Promise.all(
      Array.from(prRepositories.values()).map(async ({ owner, name }) =>
        withGitHubAccounts(accounts, async (octokit) =>
          octokit
            .request("GET /repos/{owner}/{repo}", { owner, repo: name })
            .then(({ data }) => data),
        ),
      ),
    );
    for (const repo of prRepoMetas) {
      if (!repo || repo.private || repo.archived) continue;
      addRepo({
        owner: repo.owner.login,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description ?? null,
      });
    }

    // 3. Concurrently fetch exact commit counts and year ranges per repository
    // for every account, then merge the authors into one row per repository.
    const rawContributions = await Promise.all(
      Array.from(repoMap.values()).map(async (repo): Promise<Contribution | null> => {
        const authorStats = await Promise.all(
          usernames.map((username) => fetchAuthorStats(accounts, repo, username)),
        );
        const authored = authorStats.filter((stats): stats is AuthorCommitStats => stats !== null);

        if (!authored.length) return null;

        const commitsCount = authored.reduce((total, stats) => total + stats.commitsCount, 0);

        if (commitsCount < MIN_COMMITS_FILTER) return null;

        const firstYears = authored.flatMap(({ firstCommitYear }) =>
          firstCommitYear === null ? [] : [firstCommitYear],
        );
        const lastYears = authored.flatMap(({ lastCommitYear }) =>
          lastCommitYear === null ? [] : [lastCommitYear],
        );

        return {
          repository: repo.full_name,
          owner: repo.owner,
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          commitsCount,
          firstCommitYear: firstYears.length ? Math.min(...firstYears) : null,
          lastCommitYear: lastYears.length ? Math.max(...lastYears) : null,
        };
      }),
    );

    const contributions = rawContributions.filter((c): c is Contribution => c !== null);

    // 4. Sort by lastCommitYear descending, then by commitsCount descending
    return contributions.sort((a, b) => {
      const yearDiff = (b.lastCommitYear ?? 0) - (a.lastCommitYear ?? 0);
      if (yearDiff !== 0) {
        return yearDiff;
      }
      return b.commitsCount - a.commitsCount;
    });
  },
  { maxAge: 60 * 60, swr: true },
);
