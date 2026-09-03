import { useState } from "react";

import type {
  Task,
  TaskPriority,
  TaskStatus,
  SortBy,
  SortDirection,
} from "../types";

import { filterTasks } from "../utils/TaskFilters";

import { BoardHeader } from "./BoardHeader";
import { BoardSummary } from "./BoardSummary";
import { EmptyState } from "./EmptyState";
import { TaskBoard } from "./TaskBoard";
import { TaskFilters } from "./TaskFilters";
import { TaskForm } from "./TaskForm";
import { TaskModal } from "./TaskModal";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Setup project",
    status: "TODO",
    priority: "HIGH",
    dueDate: "2026-08-20",
  },
  {
    id: 2,
    title: "Build board",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: "2026-08-28",
  },
  {
    id: 3,
    title: "Read docs",
    status: "DONE",
    priority: "HIGH",
    dueDate: "2026-08-18",
  },
  {
    id: 4,
    title: "Learn state",
    status: "TODO",
    priority: "LOW",
  },
];

const isOverdue = (task: Task) => {
  if (!task.dueDate || task.status === "DONE") {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${task.dueDate}T00:00:00`);

  return dueDate < today;
};

export function TaskBoardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<"ALL" | TaskStatus>("ALL");

  const [priorityFilter, setPriorityFilter] = useState<"ALL" | TaskPriority>(
    "ALL",
  );

  const [sortBy, setSortBy] = useState<SortBy>("CREATED");

  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  const overdueCount = tasks.filter(isOverdue).length;

  const highCount = tasks.filter((task) => task.priority === "HIGH").length;

  const filteredTasks = filterTasks(tasks, {
    search,
    status: statusFilter,
    priority: priorityFilter,
    sortBy,
    sortDirection,
  });

  const openCreateModal = () => {
    setModalMode("create");
    setEditingTaskId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: number) => {
    setModalMode("edit");
    setEditingTaskId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const addTask = (title: string, priority: TaskPriority, dueDate?: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        title,
        status: "TODO",
        priority,
        dueDate,
      },
    ]);

    closeModal();
  };

  const editTask = (
    id: number,
    title: string,
    priority: TaskPriority,
    dueDate?: string,
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              priority,
              dueDate,
            }
          : task,
      ),
    );

    closeModal();
  };

  const completeTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "DONE",
            }
          : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
    setSortBy("CREATED");
    setSortDirection("ASC");
  };

  const editingTask =
    editingTaskId === null
      ? undefined
      : tasks.find((task) => task.id === editingTaskId);

  const handleFormSubmit = (values: {
    title: string;
    priority: TaskPriority;
    dueDate?: string;
  }) => {
    if (modalMode === "create") {
      addTask(values.title, values.priority, values.dueDate);

      return;
    }

    if (modalMode === "edit" && editingTaskId !== null) {
      editTask(editingTaskId, values.title, values.priority, values.dueDate);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-8 flex items-center justify-between">
          <BoardHeader title="PROJECT MANAGEMENT" onNewTask={openCreateModal} />

          <BoardSummary
            total={tasks.length}
            done={doneCount}
            overdue={overdueCount}
            high={highCount}
          />
        </header>

        {/* FILTER */}
        <TaskFilters
          search={search}
          status={statusFilter}
          priority={priorityFilter}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onSortByChange={setSortBy}
          onSortDirectionChange={setSortDirection}
          onReset={resetFilters}
        />

        {/* RESULT COUNT */}
        <div className="mb-4">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredTasks.length}
            </span>{" "}
            of <span className="font-semibold text-white">{tasks.length}</span>{" "}
            tasks
          </p>
        </div>

        {/* BOARD */}
        {filteredTasks.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <TaskBoard
            tasks={filteredTasks}
            onComplete={completeTask}
            onDelete={deleteTask}
            onEdit={openEditModal}
          />
        )}
      </div>

      <TaskModal
        open={isModalOpen}
        title={modalMode === "create" ? "Create task" : "Edit task"}
        onClose={closeModal}
      >
        <TaskForm
          mode={modalMode}
          initialValues={
            modalMode === "edit" && editingTask
              ? {
                  title: editingTask.title,
                  priority: editingTask.priority,
                  dueDate: editingTask.dueDate,
                }
              : undefined
          }
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </TaskModal>
    </main>
  );
}
