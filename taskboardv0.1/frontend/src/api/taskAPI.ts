import { API_BASE_URL } from "../config/api";
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "../types";

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

async function parseErrorResponse(
  response: Response
): Promise<ApiError> {
  let data: ApiErrorResponse | null = null;

  try {
    data = await response.json();
  } catch {
  }

  const rawMessage = data?.message;

  const messages =
    Array.isArray(rawMessage)
      ? rawMessage
      : typeof rawMessage === "string"
        ? [rawMessage]
        : ["Request failed"];

  return new ApiError(response.status, messages);
}

export async function getTasks(): Promise<Task[]> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/tasks`);
  } catch {
    throw new Error("Cannot connect to server");
  }

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }

  return response.json();
}

export async function createTask(
  data: CreateTaskInput
): Promise<Task> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Cannot connect to server");
  }

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }

  return response.json();
}

export async function updateTask(
  id: number,
  data: UpdateTaskInput
): Promise<Task> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Cannot connect to server");
  }

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }

  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
  } catch {
    throw new Error("Cannot connect to server");
  }

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }
}