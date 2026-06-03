export interface Course {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  icon_name: string;
  level: string;
  last_accessed: string | null;
  created_at: string;
}
