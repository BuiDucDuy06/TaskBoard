import type {
  CreateTaskInput,
  TaskPriority,
} from "../types";

export type TaskFormErrors = {
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string;
};

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;

const validPriorities: TaskPriority[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
];

export function validateTaskInput(
  input: CreateTaskInput,
): TaskFormErrors {
  const errors: TaskFormErrors = {};

  const title = input.title.trim();

  const description =
    input.description?.trim() ?? "";

  if (!title) {
    errors.title = "Title is required";
  } else if (
    title.length > MAX_TITLE_LENGTH
  ) {
    errors.title =
      "Title must be 100 characters or less";
  }

  if (
    description.length >
    MAX_DESCRIPTION_LENGTH
  ) {
    errors.description =
      "Description must be 500 characters or less";
  }

  if (
    !validPriorities.includes(
      input.priority,
    )
  ) {
    errors.priority =
      "Please select a valid priority";
  }

  if (input.dueDate) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      `${input.dueDate}T00:00:00`,
    );

    if (
      Number.isNaN(dueDate.getTime())
    ) {
      errors.dueDate =
        "Please enter a valid due date";
    } else if (dueDate < today) {
      errors.dueDate =
        "Due date cannot be in the past";
    }
  }

  return errors;
}