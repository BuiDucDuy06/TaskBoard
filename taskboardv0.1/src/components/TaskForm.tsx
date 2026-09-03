import { useEffect, useState } from "react";

import type { TaskPriority } from "../types";

type TaskFormValues = {
  title: string;
  priority: TaskPriority;
  dueDate?: string;
};

type TaskFormProps = {
  mode: "create" | "edit";

  initialValues?: TaskFormValues;

  onSubmit: (values: TaskFormValues) => void;

  onCancel: () => void;

  isSubmitting?: boolean;
};

const defaultValues: TaskFormValues = {
  title: "",
  priority: "MEDIUM",
  dueDate: "",
};

export function TaskForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");

  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const values = initialValues ?? defaultValues;

    setTitle(values.title);
    setPriority(values.priority);
    setDueDate(values.dueDate ?? "");
    setError("");
  }, [initialValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title không được để trống.");
      return;
    }

    onSubmit({
      title: trimmedTitle,
      priority,
      dueDate: dueDate || undefined,
    });
  };

  const isCreate = mode === "create";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="task-title"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Title
        </label>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);

            if (error) {
              setError("");
            }
          }}
          placeholder="Enter task title..."
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
        />

        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      <div>
        <label
          htmlFor="task-priority"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Priority
        </label>

        <select
          id="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value as TaskPriority)}
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 disabled:opacity-50"
        >
          <option value="LOW">LOW</option>

          <option value="MEDIUM">MEDIUM</option>

          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="task-due-date"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Due date
        </label>

        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 disabled:opacity-50"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : isCreate
              ? "Create Task"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
