export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/todos';

export const commonTasks = [
  "筆記",
  "作業",
  "補習班",
  "寫程式",
  "英文"
];

export const PRIORITY_OPTIONS = {
  low: "低優先級",
  medium: "中優先級",
  high: "高優先級"
} as const;

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
} 