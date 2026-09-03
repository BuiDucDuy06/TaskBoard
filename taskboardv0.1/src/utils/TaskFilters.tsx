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

  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredTasks = tasks.filter(
    (task) => {
      const matchSearch =
        normalizedSearch === "" ||
        task.title
          .toLowerCase()
          .includes(normalizedSearch);

      const matchStatus =
        status === "ALL" ||
        task.status === status;

      const matchPriority =
        priority === "ALL" ||
        task.priority === priority;

      return (
        matchSearch &&
        matchStatus &&
        matchPriority
      );
    },
  );

  return [...filteredTasks].sort(
    (a, b) => {
      let result = 0;

      if (sortBy === "CREATED") {
        result = a.id - b.id;
      }

      if (sortBy === "DUE_DATE") {
        const dateA = a.dueDate
          ? new Date(
              `${a.dueDate}T00:00:00`,
            ).getTime()
          : Infinity;

        const dateB = b.dueDate
          ? new Date(
              `${b.dueDate}T00:00:00`,
            ).getTime()
          : Infinity;

        result = dateA - dateB;
      }

      if (sortBy === "PRIORITY") {
        const priorityOrder: Record<
          TaskPriority,
          number
        > = {
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
    },
  );
}