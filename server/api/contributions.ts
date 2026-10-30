import { Octokit } from "@octokit/core";

const MIN_COMMITS_FILTER = 1;

interface Contribution {
  repository: string;
  owner: string;
  name: string;
  url: string;
  description: string | null;
  commitsCount: number;
  firstCommitYear: number | null;
  lastCommitYear: number | null;
}

interface RepoMeta {
  owner: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
}

export default defineCachedEventHandler(
  async (event): Promise<Contribution[]> => {
    const config = useRuntimeConfig(event);
    const octokit = new Octokit({ auth: config.githubToken });

    // 1. Fetch current authenticated user
    const userRes = await octokit.request("GET /user").catch(() => null);
    const username = userRes?.data?.login;

    if (!username) {
      return [];
    }

    // 2. Fetch accessible repos AND search for user commits across GitHub concurrently
    const [userReposRes, searchCommitsRes] = await Promise.all([
      octokit
        .request("GET /user/repos", {
          type: "all",
          per_page: 100,
          sort: "updated",
        })
        .catch(() => ({ data: [] })),
      octokit
        .request("GET /search/commits", {
          q: `author:${username}`,
          per_page: 100,
          headers: { "X-GitHub-Api-Version": "2022-11-28" },
        })
        .catch(() => ({ data: { items: [] } })),
    ]);

    // 3. Deduplicate repositories and filter out all forks
    const repoMap = new Map<string, RepoMeta>();

    for (const repo of userReposRes.data ?? []) {
      // Skip fork repositories owned by the user
      if (repo.fork) continue;

      repoMap.set(repo.full_name, {
        owner: repo.owner.login,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description ?? null,
      });
    }

    for (const item of searchCommitsRes.data?.items ?? []) {
      const repo = item.repository;
      // Skip forks and already registered repositories
      if (repo && !repo.fork && !repoMap.has(repo.full_name)) {
        repoMap.set(repo.full_name, {
          owner: repo.owner.login,
          name: repo.name,
          full_name: repo.full_name,
          html_url: repo.html_url,
          description: repo.description ?? null,
        });
      }
    }

    const repos = Array.from(repoMap.values());

    // 4. Concurrently fetch commit counts and year ranges per repository
    const rawContributions = await Promise.all(
      repos.map(async (repo): Promise<Contribution | null> => {
        try {
          // Fetch the most recent commit authored by the user in this repo
          const { data: latest, headers } = await octokit.request(
            "GET /repos/{owner}/{repo}/commits",
            {
              owner: repo.owner,
              repo: repo.name,
              author: username,
              per_page: 1,
            },
          );

          if (!latest.length) return null;

          // Extract total commit count from pagination link header
          const link = headers["link"] ?? "";
          const lastPageMatch = link.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
          const commitsCount = parseInt(lastPageMatch?.[1] ?? String(latest.length), 10);

          // Exclude repositories below the commit threshold
          if (commitsCount < MIN_COMMITS_FILTER) return null;

          const lastDate = latest[0]?.commit?.author?.date || latest[0]?.commit?.committer?.date;
          const lastCommitYear = lastDate ? new Date(lastDate).getFullYear() : null;

          // Fetch oldest commit if more than 1 commit exists
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

          const firstCommitYear = firstDate ? new Date(firstDate).getFullYear() : null;

          return {
            repository: repo.full_name,
            owner: repo.owner,
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            commitsCount,
            firstCommitYear,
            lastCommitYear,
          };
        } catch {
          return null;
        }
      }),
    );

    const contributions = rawContributions.filter((c): c is Contribution => c !== null);

    // 5. Sort by lastCommitYear descending, then by commitsCount descending
    return contributions.sort((a, b) => {
      const yearDiff = (b.lastCommitYear ?? 0) - (a.lastCommitYear ?? 0);
      if (yearDiff !== 0) {
        return yearDiff;
      }
      return b.commitsCount - a.commitsCount;
    });
  },
  { maxAge: 60 * 60 },
);
