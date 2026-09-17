import { API_BASE_URL } from '../config/api';
import type { Task } from '../types';

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}