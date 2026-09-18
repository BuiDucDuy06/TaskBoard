import { useEffect, useState } from "react";

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
import {
  getTasks,
  updateTask,
  createTask,
  deleteTask as deleteTaskApi,
} from "../api/taskAPI";
import useDebounce from "../hooks/useDebounce";
import { useParams } from "react-router-dom";
import { projects } from "../data/projects";

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

  const { projectId } = useParams<{ projectId: string }>();

  const currentProjectId = Number(projectId);

  const currentProject = projects.find(
    (project) => project.id === currentProjectId,
  );

  const [retryCount, setRetryCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);

  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const [statusFilter, setStatusFilter] = useState<"ALL" | TaskStatus>("ALL");

  const [priorityFilter, setPriorityFilter] = useState<"ALL" | TaskPriority>(
    "ALL",
  );

  const [sortBy, setSortBy] = useState<SortBy>("CREATED");

  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalError, setModalError] = useState<string | null>(null);

  const [actionError, setActionError] = useState<string | null>(null);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  const overdueCount = tasks.filter(isOverdue).length;

  const highCount = tasks.filter((task) => task.priority === "HIGH").length;

  useEffect(() => {
    let cancelled = false;

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTasks();

        if (cancelled) return;

        setTasks(data);
      } catch {
        if (cancelled) return;

        setError("Cannot connect to server");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const refreshTasks = async () => {
    const data = await getTasks();

    setTasks(data);
  };

  useEffect(() => {
    const controller = new AbortController();

    const searchTasks = async () => {
      if (!debouncedSearch.trim()) {
        setSearchedTasks(tasks);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      try {
        const result = await fakeSearchTasks(
          tasks,
          debouncedSearch,
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        setSearchedTasks(result);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError("Could not search tasks. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    };

    searchTasks();

    return () => {
      controller.abort();
    };
  }, [debouncedSearch, tasks]);

  const fakeSearchTasks = async (
    tasks: Task[],
    query: string,
    signal: AbortSignal,
  ) => {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 300);

      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const filteredTasks = filterTasks(searchedTasks, {
    search: "",
    status: statusFilter,
    priority: priorityFilter,
    sortBy,
    sortDirection,
  });

  const openCreateModal = () => {
    setModalMode("create");
    setEditingTaskId(null);
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: number) => {
    setModalMode("edit");
    setEditingTaskId(id);
    setModalError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingTaskId(null);
    setModalError(null);
  };

  const editTask = async (id: number, values: UpdateTaskInput) => {
    try {
      setIsSubmitting(true);
      setModalError(null);

      await updateTask(id, values);
      await refreshTasks();

      setIsModalOpen(false);
      setEditingTaskId(null);
      setModalError(null);
    } catch {
      setModalError("Could not update task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeTask = async (id: number) => {
    try {
      setActionError(null);

      await updateTask(id, {
        status: "DONE",
      });

      await refreshTasks();
    } catch {
      setActionError("Could not complete task. Please try again.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setActionError(null);

      await deleteTaskApi(id);
      await refreshTasks();
    } catch {
      setActionError("Could not delete task. Please try again.");
    }
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

  const handleFormSubmit = async (values: CreateTaskInput) => {
    if (modalMode === "create") {
      await handleCreateTask(values);
      return;
    }

    if (modalMode === "edit" && editingTaskId !== null) {
      await editTask(editingTaskId, values);
    }
  };

  const handleCreateTask = async (values: CreateTaskInput) => {
    try {
      setIsSubmitting(true);
      setModalError(null);

      await createTask(values);
      await refreshTasks();

      setIsModalOpen(false);
      setEditingTaskId(null);
      setModalError(null);
    } catch {
      setModalError("Could not create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-2xl font-bold">Project Management</h1>

          <div className="rounded-lg border border-slate-700 bg-slate-900 p-8 text-center">
            <p className="text-slate-300">Loading tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-2xl font-bold">Project Management</h1>

          <div className="rounded-lg border border-red-800 bg-red-950/40 p-8 text-center">
            <h2 className="mb-2 text-lg font-semibold text-red-400">{error}</h2>

            <p className="mb-4 text-sm text-red-300">Please try again.</p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-2xl font-bold">Project Management</h1>

          <div className="rounded-lg border border-slate-700 bg-slate-900 p-8 text-center">
            <h2 className="mb-4 text-lg font-semibold">No tasks yet.</h2>

            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Create first task
            </button>
          </div>
        </div>

        <TaskModal
          open={isModalOpen}
          title={modalMode === "create" ? "Create task" : "Edit task"}
          onClose={closeModal}
        >
          {modalError && (
            <div className="mb-4 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {modalError}
            </div>
          )}
          <TaskForm
            mode={modalMode}
            initialValues={
              modalMode === "edit" && editingTask
                ? {
                    title: editingTask.title,
                    description: editingTask.description,
                    priority: editingTask.priority,
                    dueDate: editingTask.dueDate,
                  }
                : undefined
            }
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            isSubmitting={isSubmitting}
          />
        </TaskModal>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <BoardHeader
            title={currentProject?.name ?? "Project"}
            onNewTask={openCreateModal}
          />

          <BoardSummary
            total={tasks.length}
            done={doneCount}
            overdue={overdueCount}
            high={highCount}
          />
        </header>
        {actionError && (
          <div className="mb-4 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {actionError}
          </div>
        )}
        <TaskFilters
          search={search}
          status={statusFilter}
          priority={priorityFilter}
          sortBy={sortBy}
          sortDirection={sortDirection}
          isSearching={isSearching}
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
        {modalError && (
          <div className="mb-4 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {modalError}
          </div>
        )}
        <TaskForm
          mode={modalMode}
          initialValues={
            modalMode === "edit" && editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description,
                  priority: editingTask.priority,
                  dueDate: editingTask.dueDate,
                }
              : undefined
          }
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
          isSubmitting={isSubmitting}
        />
      </TaskModal>
    </main>
  );
}
