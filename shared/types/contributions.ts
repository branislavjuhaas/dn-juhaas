export interface Contribution {
  repository: string;
  owner: string;
  name: string;
  url: string;
  description: string | null;
  commitsCount: number;
  firstCommitYear: number | null;
  lastCommitYear: number | null;
}
