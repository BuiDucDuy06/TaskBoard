import { useState } from "react";
import type {
  Task,
  TaskStatus,
  TaskPriority,
  SortBy,
  SortDirection,
} from "../types";
import { TaskForm } from "./TaskForm";
import { TaskColumn } from "./TaskColumn";
import { TaskFilterBar } from "./TaskFilterBar";
import { filterTasks } from "../utils/TaskFilters";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Setup project",
    status: "TODO",
    priority: "HIGH",
    dueDate: "2026-08-20",
  },
  {
    id: 2,
    title: "Build board",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: "2026-08-28",
  },
  {
    id: 3,
    title: "Read docs",
    status: "DONE",
    priority: "HIGH",
    dueDate: "2026-08-18",
  },
  {
    id: 4,
    title: "Learn state",
    status: "TODO",
    priority: "LOW",
  },
];

const columns: {
  status: TaskStatus;
  title: string;
}[] = [
  { status: "TODO", title: "TODO" },
  { status: "IN_PROGRESS", title: "IN PROGRESS" },
  { status: "DONE", title: "DONE" },
];

const isOverdue = (task: Task) => {
  if (!task.dueDate) return false;

  if (task.status === "DONE") return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${task.dueDate}T00:00:00`);

  return dueDate < today;
};

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TaskStatus>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<"ALL" | TaskPriority>(
    "ALL",
  );
  const [sortBy, setSortBy] = useState<SortBy>("CREATED");
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  const overdueCount = tasks.filter(isOverdue).length;

  const highCount = tasks.filter((task) => task.priority === "HIGH").length;

  const filteredTasks = filterTasks(tasks, {
    search,
    status: statusFilter,
    priority: priorityFilter,
    sortBy,
    sortDirection,
  });

  const addTask = (title: string, priority: TaskPriority, dueDate?: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        title,
        status: "TODO",
        priority,
        dueDate,
      },
    ]);
  };

  const completeTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "DONE" } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (
    id: number,
    title: string,
    priority: TaskPriority,
    dueDate?: string,
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title, priority, dueDate } : task,
      ),
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
    setSortBy("CREATED");
    setSortDirection("ASC");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            PROJECT MANAGEMENT
          </h1>

          <div className="flex gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
              <span className="text-xs text-slate-400">Total</span>

              <span className="ml-2 font-semibold">{tasks.length}</span>
            </div>

            <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-2">
              <span className="text-xs text-emerald-400">Done</span>

              <span className="ml-2 font-semibold text-emerald-300">
                {doneCount}
              </span>
            </div>
            <div className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-2">
              <span className="text-xs text-red-400">Overdue</span>

              <span className="ml-2 font-semibold text-red-300">
                {overdueCount}
              </span>
            </div>
            <div className="rounded-xl border border-orange-900/50 bg-orange-950/30 px-4 py-2">
              <span className="text-xs text-orange-400">High</span>

              <span className="ml-2 font-semibold text-orange-300">
                {highCount}
              </span>
            </div>
          </div>
        </header>

        <TaskFilterBar
          search={search}
          status={statusFilter}
          priority={priorityFilter}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onSortByChange={setSortBy}
          onSortDirectionChange={setSortDirection}
          onReset={resetFilters}
        />

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredTasks.length}
            </span>{" "}
            of <span className="font-semibold text-white">{tasks.length}</span>{" "}
            tasks
          </p>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="mb-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-xl">
              🔍
            </div>

            <h2 className="text-lg font-semibold text-white">No tasks found</h2>

            <p className="mt-2 text-sm text-slate-500">
              No task matches your current filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-indigo-500"
            >
              Reset filters
            </button>
          </div>
        ) : (
          /* BOARD */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {columns.map((column) => (
              <TaskColumn
                key={column.status}
                title={column.title}
                status={column.status}
                tasks={filteredTasks}
                onComplete={completeTask}
                onDelete={deleteTask}
                onEdit={editTask}
                isOverdue={isOverdue}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto mb-8 max-w-6xl">
        <TaskForm onAdd={addTask} />
      </div>
    </main>
  );
}
