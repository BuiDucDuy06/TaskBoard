import type { Task, TaskStatus } from "../types";
import { TaskCard } from "./TaskCard";

type TaskColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskColumn({
  title,
  status,
  tasks,
  onComplete,
  onDelete,
}: TaskColumnProps) {
  const columnTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <section>
      <h2>
        {title} ({columnTasks.length})
      </h2>

      {columnTasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
}
