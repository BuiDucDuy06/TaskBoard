import type { Task, TaskPriority, TaskStatus } from "../types";

import { TaskCard } from "./TaskCard";

type TaskColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];

  onComplete: (id: number) => void;

  onDelete: (id: number) => void;

  onEdit: (id: number) => void;
};

export function TaskColumn({
  title,
  status,
  tasks,
  onComplete,
  onDelete,
  onEdit,
}: TaskColumnProps) {
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-200">{title}</h2>

        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
          ({columnTasks.length})
        </span>
      </div>

      <div className="space-y-3">
        {columnTasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks</p>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </section>
  );
}
