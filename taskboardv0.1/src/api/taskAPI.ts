import type { Task } from "../types";

type FakeApiMode = "success" | "empty" | "error";

const fakeTasks: Task[] = [
  {
    id: 1,
    title: "Setup project",
    status: "TODO",
    priority: "HIGH",
    dueDate: "2026-09-20",
  },
  {
    id: 2,
    title: "Build board",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: "2026-09-25",
  },
  {
    id: 3,
    title: "Read docs",
    status: "DONE",
    priority: "LOW",
    dueDate: "2026-09-15",
  },
];

export function fakeGetTasks(
  mode: FakeApiMode = "success"
): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    const delay = 1000;

    setTimeout(() => {
      if (mode === "success") {
        resolve(fakeTasks);
        return;
      }

      if (mode === "empty") {
        resolve([]);
        return;
      }

      if (mode === "error") {
        reject(new Error("Could not load tasks."));
      }
    }, delay);
  });
}