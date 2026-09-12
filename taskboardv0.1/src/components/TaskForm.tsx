import { useEffect, useState } from "react";
import type { CreateTaskInput, TaskPriority } from "../types";
import { validateTaskInput, type TaskFormErrors} from "../utils/taskValidation";

type TaskFormValues = CreateTaskInput;

type TaskFormProps = {
  mode: "create" | "edit";

  initialValues?: TaskFormValues;

  onSubmit: (values: TaskFormValues) => void;

  onCancel: () => void;

  isSubmitting?: boolean;
};

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  priority: "MEDIUM",
  dueDate: "",
};

export function TaskForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: TaskFormProps) {
  const [formValues, setFormValues] = useState<TaskFormValues>(defaultValues);

  const [errors, setErrors] = useState<TaskFormErrors>({});

  useEffect(() => {
    setFormValues(initialValues ?? defaultValues);

    setErrors({});
  }, [initialValues]);

  const updateField = <K extends keyof TaskFormValues>(
    field: K,
    value: TaskFormValues[K],
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateTaskInput(formValues);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      title: formValues.title.trim(),
      description: formValues.description?.trim() || undefined,
      priority: formValues.priority,
      dueDate: formValues.dueDate || undefined,
    });
  };

  const isCreate = mode === "create";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="task-title"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Title <span className="text-red-400">*</span>
        </label>

        <input
          id="task-title"
          type="text"
          value={formValues.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="Enter task title..."
          disabled={isSubmitting}
          maxLength={100}
          className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 disabled:opacity-50 ${
            errors.title
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          }`}
        />

        {errors.title && (
          <p className="mt-2 text-sm text-red-400">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="task-description"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Description
        </label>

        <textarea
          id="task-description"
          value={formValues.description ?? ""}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Enter task description..."
          disabled={isSubmitting}
          maxLength={500}
          rows={4}
          className={`w-full resize-none rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 disabled:opacity-50 ${
            errors.description
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          }`}
        />

        <div className="mt-1 flex justify-between">
          {errors.description ? (
            <p className="text-sm text-red-400">{errors.description}</p>
          ) : (
            <span />
          )}

          <span className="text-xs text-slate-500">
            {(formValues.description ?? "").length}
            /500
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="task-priority"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Priority <span className="text-red-400">*</span>
        </label>

        <select
          id="task-priority"
          value={formValues.priority}
          onChange={(event) =>
            updateField("priority", event.target.value as TaskPriority)
          }
          disabled={isSubmitting}
          className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none disabled:opacity-50 ${
            errors.priority
              ? "border-red-500"
              : "border-slate-700 focus:border-indigo-500"
          }`}
        >
          <option value="LOW">LOW</option>

          <option value="MEDIUM">MEDIUM</option>

          <option value="HIGH">HIGH</option>
        </select>

        {errors.priority && (
          <p className="mt-2 text-sm text-red-400">{errors.priority}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="task-due-date"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Due date
        </label>

        <input
          id="task-due-date"
          type="date"
          value={formValues.dueDate ?? ""}
          onChange={(event) => updateField("dueDate", event.target.value)}
          disabled={isSubmitting}
          className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none disabled:opacity-50 ${
            errors.dueDate
              ? "border-red-500"
              : "border-slate-700 focus:border-indigo-500"
          }`}
        />

        {errors.dueDate && (
          <p className="mt-2 text-sm text-red-400">{errors.dueDate}</p>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : isCreate
              ? "Create Task"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
