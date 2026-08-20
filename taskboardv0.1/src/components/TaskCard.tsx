import type { Task } from "../types";

type TaskCardProps = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskCard({
  task,
  onComplete,
  onDelete,
}: TaskCardProps) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>

      {task.status !== "DONE" && (
        <button onClick={() => onComplete(task.id)}>
          Complete
        </button>
      )}

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}
