import type { Task } from "../types";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export function TaskCard({
  task,
  onComplete,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [error, setError] = useState("");

  const startEdit = () => {
    setDraftTitle(task.title);
    setError("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraftTitle(task.title);
    setError("");
    setIsEditing(false);
  };

  const saveEdit = () => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setError("Task title không được để trống.");
      return;
    }

    onEdit(task.id, trimmedTitle);
    setIsEditing(false);
    setError("");
  };
  if (isEditing) {
    return (
      <div>
        <input
          value={draftTitle}
          onChange={(e) => {
            setDraftTitle(e.target.value);
            if (error) setError("");
          }}
        />

        {error && <p>{error}</p>}

        <button onClick={saveEdit}>Save</button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    );
  }
  return (
    <div>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>

      <button onClick={startEdit}>Edit</button>

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
