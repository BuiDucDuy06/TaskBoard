import type { Task, TaskStatus, TaskPriority } from "../types";
import { TaskCard } from "./TaskCard";

type TaskColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, priority: TaskPriority, dueDate?: string) => void;
  isOverdue: (task: Task) => boolean;
};

export function TaskColumn({
  title,
  status,
  tasks,
  onComplete,
  onDelete,
  onEdit,
  isOverdue,
}: TaskColumnProps) {
  const columnTasks = tasks.filter(
    (task) => task.status === status
  );

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
          <p>No tasks</p>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              onEdit={onEdit}
              isOverdue={isOverdue(task)}
            />
          ))
        )}
      </div>
    </section>
  );
}
