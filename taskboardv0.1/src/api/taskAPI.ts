import type { Task } from "../types";

const projectTasks: Record<number, Task[]> = {
  1: [
    {
      id: 1,
      title: "Setup project",
      status: "TODO",
      priority: "HIGH",
      dueDate: "2026-09-20",
    },
  ],

  2: [
    {
      id: 2,
      title: "Design dashboard",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      dueDate: "2026-09-22",
    },
  ],

  3: [
    {
      id: 3,
      title: "Fix login bug",
      status: "DONE",
      priority: "HIGH",
      dueDate: "2026-09-21",
    },
  ],
};

export function fakeGetTasks(
  projectId: number,
  signal?: AbortSignal
): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        return;
      }
      if (projectId === 2) {
        reject(new Error("Could not load tasks."));
        return;
      }

      resolve(projectTasks[projectId] ?? []);
    }, 1000);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Request cancelled", "AbortError"));
    });
  });
}

export function fakeSearchTasks(
  tasks: Task[],
  query: string
): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) {
        resolve(tasks);
        return;
      }

      const result = tasks.filter((task) =>
        task.title.toLowerCase().includes(normalizedQuery)
      );

      resolve(result);
    }, 500);
  });
}