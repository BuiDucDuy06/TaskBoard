import { useCallback, useEffect, useState } from "react";

import type {
  Task,
  TaskPriority,
  TaskStatus,
  SortBy,
  SortDirection,
  CreateTaskInput,
  UpdateTaskInput,
} from "../types";

import { filterTasks } from "../utils/TaskFilters";
import { BoardHeader } from "./BoardHeader";
import { BoardSummary } from "./BoardSummary";
import { EmptyState } from "./EmptyState";
import { TaskBoard } from "./TaskBoard";
import { TaskFilters } from "./TaskFilters";
import { TaskForm } from "./TaskForm";
import { TaskModal } from "./TaskModal";
import { fakeGetTasks } from "../api/taskAPI";

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
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);

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

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fakeGetTasks();

      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);

      setError("Could not load tasks.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

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

  const addTask = (values: CreateTaskInput) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        title: values.title,
        description: values.description,
        status: "TODO",
        priority: values.priority,
        dueDate: values.dueDate,
      },
    ]);

    closeModal();
  };

  const editTask = (id: number, values: UpdateTaskInput) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: values.title,
              description: values.description,
              priority: values.priority,
              dueDate: values.dueDate,
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

  const handleFormSubmit = (values: CreateTaskInput) => {
    if (modalMode === "create") {
      addTask(values);
      return;
    }

    if (modalMode === "edit" && editingTaskId !== null) {
      editTask(editingTaskId, values);
    }
  };

if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Project Management
        </h1>

        <div className="rounded-lg border bg-white p-8 text-center">
          <p className="text-gray-600">
            Loading tasks...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Project Management
        </h1>

        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="mb-2 text-lg font-semibold text-red-700">
            {error}
          </h2>

          <p className="mb-4 text-sm text-red-600">
            Please try again.
          </p>

          <button
            type="button"
            onClick={loadTasks}
            className="rounded-md bg-red-600 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Project Management
        </h1>

        <div className="rounded-lg border bg-white p-8 text-center">
          <h2 className="mb-4 text-lg font-semibold">
            No tasks yet.
          </h2>

          <button
            type="button"
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Create first task
          </button>
        </div>
      </div>
    );
  }

  return (
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <BoardHeader title="PROJECT MANAGEMENT" onNewTask={openCreateModal} />

          <BoardSummary
            total={tasks.length}
            done={doneCount}
            overdue={overdueCount}
            high={highCount}
          />
        </header>
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
