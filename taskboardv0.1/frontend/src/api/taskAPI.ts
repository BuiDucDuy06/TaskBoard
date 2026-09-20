import { API_BASE_URL } from "../config/api";
import type { CreateTaskInput, Task, UpdateTaskInput } from "../types";

export type ApiErrorResponse = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};

export class ApiError extends Error {
  statusCode: number;
  messages: string[];

  constructor(statusCode: number, messages: string[]) {
    super(messages.join(", "));
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

async function handleApiError(response: Response): Promise<never> {
  let data: ApiErrorResponse | null = null;

  try {
    data = await response.json();
  } catch {
  }

  const rawMessages = data?.message;

  const messages = Array.isArray(rawMessages)
    ? rawMessages
    : typeof rawMessages === "string"
      ? [rawMessages]
      : ["Request failed"];

  throw new ApiError(response.status, messages);
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`);

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

export async function updateTask(
  id: number,
  data: UpdateTaskInput,
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

export async function deleteTask(id: number): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}
