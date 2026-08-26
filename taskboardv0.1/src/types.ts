export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type SortBy = "CREATED" | "DUE_DATE" | "PRIORITY";

export type SortDirection = "ASC" | "DESC";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
};
