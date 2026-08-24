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

  const doneCount = tasks.filter((task) => task.status === "DONE").length;

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
        task.id === id ? { ...task, status: "DONE" } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, title: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title } : task)),
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            PROJECT MANAGEMENT
          </h1>

          <div className="flex gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
              <span className="text-xs text-slate-400">Total</span>

              <span className="ml-2 font-semibold">{tasks.length}</span>
            </div>

            <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-2">
              <span className="text-xs text-emerald-400">Done</span>

              <span className="ml-2 font-semibold text-emerald-300">
                {doneCount}
              </span>
            </div>
          </div>
        </header>
      </div>

      <div className="mx-auto mb-8 max-w-6xl">
      <TaskForm onAdd={addTask} />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks}
            onComplete={completeTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </div>
    </main>
  );
}
