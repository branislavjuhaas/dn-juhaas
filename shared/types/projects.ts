export interface TopProject {
  name: string;
  totalHours: number;
  description: string | null;
  commitsLast7Days: number;
  url?: string | null;
}
