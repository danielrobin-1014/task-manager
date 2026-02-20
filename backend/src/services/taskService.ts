/**
 * Task Service
 * Handles business logic for task operations
 */

import { Task, ITaskDocument } from "../models/Task";
import { ValidationError, NotFoundError, AuthorizationError } from "../utils/errors";

/**
 * Create a new task
 */
export const createTask = async (
  userId: string,
  title: string,
  description: string
): Promise<ITaskDocument> => {
  if (!title || !description) {
    throw new ValidationError("Title and description are required");
  }

  const task = new Task({
    title,
    description,
    userId,
    status: "pending",
  });

  await task.save();
  return task;
};

/**
 * Get all tasks for a user with filtering, sorting, and pagination
 */
export const getUserTasks = async (
  userId: string,
  options?: {
    status?: "pending" | "completed";
    sortBy?: "createdAt" | "updatedAt" | "title";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
  }
): Promise<{ tasks: ITaskDocument[]; total: number; page: number; totalPages: number }> => {
  const {
    status,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 100,
  } = options || {};

  // Build query
  const query: Record<string, unknown> = { userId };
  if (status) {
    query.status = status;
  }

  // Build sort object
  const sortObj: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sortObj).skip(skip).limit(limit),
    Task.countDocuments(query),
  ]);

  return {
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Get a single task by ID
 */
export const getTaskById = async (taskId: string, userId: string): Promise<ITaskDocument> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new NotFoundError("Task");
  }

  // Ensure task belongs to the user
  if (task.userId.toString() !== userId) {
    throw new AuthorizationError("You do not have permission to access this task");
  }

  return task;
};

/**
 * Update a task
 */
export const updateTask = async (
  taskId: string,
  userId: string,
  updates: { title?: string; description?: string; status?: "pending" | "completed" }
): Promise<ITaskDocument> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new NotFoundError("Task");
  }

  // Ensure task belongs to the user
  if (task.userId.toString() !== userId) {
    throw new AuthorizationError("You do not have permission to update this task");
  }

  // Validate status if provided
  if (updates.status && !["pending", "completed"].includes(updates.status)) {
    throw new ValidationError("Status must be either 'pending' or 'completed'");
  }

  // Update fields
  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.status !== undefined) task.status = updates.status;

  await task.save();
  return task;
};

/**
 * Delete a task
 */
export const deleteTask = async (taskId: string, userId: string): Promise<void> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new NotFoundError("Task");
  }

  // Ensure task belongs to the user
  if (task.userId.toString() !== userId) {
    throw new AuthorizationError("You do not have permission to delete this task");
  }

  await Task.findByIdAndDelete(taskId);
};
