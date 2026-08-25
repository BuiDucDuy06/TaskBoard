import { useState } from "react";
import type { TaskPriority } from "../types";

type TaskFormProps = {
  onAdd: (title: string,priority: TaskPriority, dueDate?: string) => void;
};

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title không được để trống.");
      return;
    }

    onAdd(trimmedTitle, priority, dueDate || undefined);
    setTitle("");
    setPriority("MEDIUM");
    setDueDate("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_180px_180px_auto]">
        <input
          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter task title..."
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500 active:scale-95"
        >
          + Add Task
        </button>

        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500 active:scale-95"
        >
          Add Task
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <p className="mt-3 text-xs text-slate-500">Due date is optional.</p>
    </form>
  );
}
