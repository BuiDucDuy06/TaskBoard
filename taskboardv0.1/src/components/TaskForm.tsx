import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string) => void;
};

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title không được để trống.");
      return;
    }

    onAdd(trimmedTitle);
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        placeholder="Enter task title..."
      />

      <button type="submit">Add Task</button>

      {error && <p>{error}</p>}
    </form>
  );
}
