import { Octokit } from "@octokit/core";

export interface GitHubAccount {
  login: string;
  octokit: Octokit;
}

/**
 * Resolve every configured token to an authenticated GitHub account.
 *
 * Tokens that are missing or invalid are skipped so the site keeps working
 * with the accounts that are available.
 */
export async function resolveGitHubAccounts(
  tokens: Array<string | undefined>,
): Promise<GitHubAccount[]> {
  const uniqueTokens = [...new Set(tokens.filter((token): token is string => Boolean(token)))];

  const resolved = await Promise.all(
    uniqueTokens.map(async (auth): Promise<GitHubAccount | null> => {
      const octokit = new Octokit({ auth });
      const response = await octokit.request("GET /user").catch(() => null);
      const login = response?.data?.login;

      return login ? { login, octokit } : null;
    }),
  );

  const accounts = new Map<string, GitHubAccount>();
  for (const account of resolved) {
    if (account && !accounts.has(account.login)) {
      accounts.set(account.login, account);
    }
  }

  return [...accounts.values()];
}

/**
 * Run a request with the first token that can see the resource.
 *
 * This lets a narrower token fall back to a broader one for private
 * repositories without exposing which token succeeded.
 */
export async function withGitHubAccounts<T>(
  accounts: GitHubAccount[],
  request: (octokit: Octokit) => Promise<T>,
): Promise<T | null> {
  for (const account of accounts) {
    try {
      return await request(account.octokit);
    } catch {
      // Try the next account.
    }
  }

  return null;
}
