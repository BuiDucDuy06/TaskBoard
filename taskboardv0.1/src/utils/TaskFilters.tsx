import type {
  Task,
  TaskPriority,
  TaskStatus,
  SortBy,
  SortDirection,
} from "../types";

export type TaskFilters = {
  search: string;
  status: "ALL" | TaskStatus;
  priority: "ALL" | TaskPriority;
  sortBy: SortBy;
  sortDirection: SortDirection;
};

export function filterTasks(
  tasks: Task[],
  filters: TaskFilters,
): Task[] {
  const {
    search,
    status,
    priority,
    sortBy,
    sortDirection,
  } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    // Search
    const matchSearch =
      normalizedSearch === "" ||
      task.title.toLowerCase().includes(normalizedSearch);

    // Status
    const matchStatus =
      status === "ALL" ||
      task.status === status;

    // Priority
    const matchPriority =
      priority === "ALL" ||
      task.priority === priority;

    // Tất cả filter đang bật phải đúng
    return (
      matchSearch &&
      matchStatus &&
      matchPriority
    );
  });

  // Không mutate filteredTasks
  return [...filteredTasks].sort((a, b) => {
    let result = 0;

    if (sortBy === "CREATED") {
      // Project chưa có createdAt nên dùng id
      result = a.id - b.id;
    }

    if (sortBy === "DUE_DATE") {
      const dateA = a.dueDate
        ? new Date(`${a.dueDate}T00:00:00`).getTime()
        : Infinity;

      const dateB = b.dueDate
        ? new Date(`${b.dueDate}T00:00:00`).getTime()
        : Infinity;

      result = dateA - dateB;
    }

    if (sortBy === "PRIORITY") {
      const priorityOrder: Record<TaskPriority, number> = {
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3,
      };

      result =
        priorityOrder[a.priority] -
        priorityOrder[b.priority];
    }

    return sortDirection === "ASC"
      ? result
      : -result;
  });
}