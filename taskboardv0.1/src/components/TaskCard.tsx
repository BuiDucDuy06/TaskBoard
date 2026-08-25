import type { Task, TaskPriority } from "../types";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    title: string,
    priority: TaskPriority,
    dueDate?: string,
  ) => void;
  isOverdue: boolean;
};

const formatDueDate = (dueDate?: string) => {
  if (!dueDate) return "No due date";

  const date = new Date(`${dueDate}T00:00:00`);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const priorityStyle = {
  LOW: "bg-slate-800 text-slate-300",
  MEDIUM: "bg-yellow-500/10 text-yellow-400",
  HIGH: "bg-red-500/10 text-red-400",
};

export function TaskCard({
  task,
  onComplete,
  onDelete,
  onEdit,
  isOverdue,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftPriority, setDraftPriority] = useState<TaskPriority>(
    task.priority,
  );
  const [draftDueDate, setDraftDueDate] = useState(task.dueDate ?? "");
  const [error, setError] = useState("");

  const startEdit = () => {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setDraftDueDate(task.dueDate ?? "");
    setError("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setDraftDueDate(task.dueDate ?? "");
    setError("");
    setIsEditing(false);
  };

  const saveEdit = () => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setError("Task title không được để trống.");
      return;
    }

    onEdit(task.id, trimmedTitle, draftPriority, draftDueDate || undefined);
    setIsEditing(false);
    setError("");
  };
  if (isEditing) {
    return (
      <article className="group rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-slate-700 hover:bg-slate-950">
        <div>
          <input
            className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
            value={draftTitle}
            onChange={(e) => {
              setDraftTitle(e.target.value);
              if (error) setError("");
            }}
          />

          <select
            value={draftPriority}
            onChange={(e) => setDraftPriority(e.target.value as TaskPriority)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <input
            type="date"
            value={draftDueDate}
            onChange={(e) => setDraftDueDate(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          {error && <p>{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium hover:bg-indigo-500"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="rounded-lg bg-slate-600 px-3 py-1.5 text-xs font-medium hover:bg-slate-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </article>
    );
  }
  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium leading-5 text-slate-200">
          {task.title}
        </h3>
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            task.status === "DONE"
              ? "bg-emerald-400"
              : task.status === "IN_PROGRESS"
                ? "bg-amber-400"
                : "bg-slate-500"
          }`}
        />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs text-slate-500">Priority:</span>

        <span
          className={`rounded-md px-2 py-1 text-xs font-medium ${
            priorityStyle[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

            <div className="mb-3 flex items-center gap-2">
        <span className="text-xs text-slate-500">
          Due:
        </span>

        <span className="text-xs text-slate-300">
          {formatDueDate(task.dueDate)}
        </span>
      </div>

      {isOverdue && (
        <div className="mb-4">
          <span className="inline-flex rounded-md bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400">
            Overdue
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 opacity-70 transition group-hover:opacity-100">
        <button
          onClick={startEdit}
          className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700"
        >
          Edit
        </button>

        {task.status !== "DONE" && (
          <button
            onClick={() => onComplete(task.id)}
            className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400 hover:bg-emerald-500/20"
          >
            Complete
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md bg-red-500/10 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
