export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};
