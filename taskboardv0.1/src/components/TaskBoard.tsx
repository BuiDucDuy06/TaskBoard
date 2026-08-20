import { useState } from "react";
import type { Task, TaskStatus } from "../types";
import { TaskForm } from "./TaskForm";
import { TaskColumn } from "./TaskColumn";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Setup project",
    status: "TODO",
  },
  {
    id: 2,
    title: "Build board",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    title: "Read docs",
    status: "DONE",
  },
  {
    id: 4,
    title: "Learn state",
    status: "TODO",
  },
];

const columns: {
  status: TaskStatus;
  title: string;
}[] = [
  { status: "TODO", title: "TODO" },
  { status: "IN_PROGRESS", title: "IN PROGRESS" },
  { status: "DONE", title: "DONE" },
];

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const doneCount = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const addTask = (title: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        title,
        status: "TODO",
      },
    ]);
  };

  const completeTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: "DONE" }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <main>
      <header>
        <h1>PROJECT MANAGEMENT</h1>

        <p>
          Total: {tasks.length} | Done: {doneCount}
        </p>
      </header>

      <TaskForm onAdd={addTask} />

      <div>
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks}
            onComplete={completeTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </main>
  );
}
