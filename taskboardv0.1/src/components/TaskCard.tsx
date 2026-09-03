import type { Task } from "../types";

type TaskCardProps = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export function TaskCard({
  task,
  onComplete,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const priorityClass = {
    LOW: "bg-slate-700 text-slate-300",
    MEDIUM: "bg-yellow-500/10 text-yellow-400",
    HIGH: "bg-red-500/10 text-red-400",
  };

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700">
      {/* TITLE */}
      <div className="mb-3">
        <h3 className="truncate font-medium text-white">
          {task.title}
        </h3>
      </div>

      {/* INFO */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {/* PRIORITY */}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            priorityClass[task.priority]
          }`}
        >
          {task.priority}
        </span>

        {/* DUE DATE */}
        {task.dueDate && (
          <span className="text-xs text-slate-500">
            Due: {task.dueDate}
          </span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-2">
        {/* EDIT */}
        <button
          type="button"
          onClick={() => onEdit(task.id)}
          className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          Edit
        </button>

        {/* COMPLETE */}
        {task.status !== "DONE" && (
          <button
            type="button"
            onClick={() => onComplete(task.id)}
            className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
          >
            Complete
          </button>
        )}

        {/* DELETE */}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
        >
          Delete
        </button>
      </div>
    </article>
  );
}