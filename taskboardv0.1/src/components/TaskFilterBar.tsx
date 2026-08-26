import type {
  TaskPriority,
  TaskStatus,
  SortBy,
  SortDirection,
} from "../types";

type TaskFilterBarProps = {
  search: string;
  status: "ALL" | TaskStatus;
  priority: "ALL" | TaskPriority;
  sortBy: SortBy;
  sortDirection: SortDirection;

  onSearchChange: (value: string) => void;

  onStatusChange: (
    value: "ALL" | TaskStatus,
  ) => void;

  onPriorityChange: (
    value: "ALL" | TaskPriority,
  ) => void;

  onSortByChange: (
    value: SortBy,
  ) => void;

  onSortDirectionChange: (
    value: SortDirection,
  ) => void;

  onReset: () => void;
};

export function TaskFilterBar({
  search,
  status,
  priority,
  sortBy,
  sortDirection,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortByChange,
  onSortDirectionChange,
  onReset,
}: TaskFilterBarProps) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">
          FILTER BAR
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Search, filter and sort your tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-xs font-medium text-slate-400">
            Search
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search task title..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-400">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as "ALL" | TaskStatus,
              )
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value="ALL">ALL</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">
              IN PROGRESS
            </option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-400">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              onPriorityChange(
                e.target.value as
                  | "ALL"
                  | TaskPriority,
              )
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value="ALL">ALL</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        {/* Sort by */}
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-400">
            Sort by
          </label>

          <select
            value={sortBy}
            onChange={(e) =>
              onSortByChange(
                e.target.value as SortBy,
              )
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value="CREATED">
              Created / Newest
            </option>

            <option value="DUE_DATE">
              Due date
            </option>

            <option value="PRIORITY">
              Priority
            </option>
          </select>
        </div>
      </div>

      {/* Direction + Reset */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:w-48">
          <label className="mb-2 block text-xs font-medium text-slate-400">
            Direction
          </label>

          <select
            value={sortDirection}
            onChange={(e) =>
              onSortDirectionChange(
                e.target.value as SortDirection,
              )
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700"
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}