import { Task } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Fetch all tasks.
 * @returns An array of Task objects.
 */
export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${BASE_URL}/tasks`, { cache: "no-store" });
  if (!res.ok) {
    const errorBody = await res.json();
    console.error(`[getTasks] Error status: ${res.status} (${res.statusText})`, errorBody);
    throw new Error(errorBody.error || "Failed to fetch tasks");
  }
  return res.json();
};

/**
 * Fetch a single task by ID.
 * @param id Task ID.
 * @returns The Task object.
 */
export const getTaskById = async (id: number): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { cache: "no-store" });
  if (!res.ok) {
    const errorBody = await res.json();
    console.error(`[getTaskById] Error status: ${res.status} (${res.statusText})`, errorBody);
    throw new Error(errorBody.error || "Failed to fetch task");
  }
  return res.json() as Promise<Task>;
};

/**
 * Create a new task.
 * @param data Partial task data (title, color, etc.).
 * @returns The newly created Task object.
 */
export const createTask = async (data: Partial<Task>): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    console.error(`[createTask] Error status: ${res.status} (${res.statusText})`, errorBody);
    throw new Error(errorBody.error || "Failed to create task");
  }
  return res.json();
};

/**
 * Update a task by ID.
 * @param id The task's ID.
 * @param updates Partial task updates (title, color, completed, etc.).
 * @returns The updated Task object.
 */
export const updateTask = async (id: number, updates: Partial<Task>): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    console.error(`[updateTask] Error status: ${res.status} (${res.statusText})`, errorBody);
    throw new Error(errorBody.error || "Failed to update task");
  }
  return res.json();
};

/**
 * Delete a task by ID.
 * @param id The task's ID.
 * @returns A promise resolving to void if successful.
 */
export const deleteTask = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorBody = await res.json();
    console.error(`[deleteTask] Error status: ${res.status} (${res.statusText})`, errorBody);
    throw new Error(errorBody.error || "Failed to delete task");
  }
};