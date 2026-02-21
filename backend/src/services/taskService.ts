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
  description: string,
  priority?: "low" | "medium" | "high",
  category?: string[],
  dueDate?: Date
): Promise<ITaskDocument> => {
  if (!title) {
    throw new ValidationError("Title is required");
  }

  const task = new Task({
    title,
    description: description || "",
    userId,
    status: "pending",
    priority: priority || "medium",
    category: category || [],
    dueDate: dueDate || undefined,
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
    priority?: "low" | "medium" | "high";
    category?: string;
    sortBy?: "createdAt" | "updatedAt" | "title" | "priority" | "dueDate";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
  }
): Promise<{ tasks: ITaskDocument[]; total: number; page: number; totalPages: number }> => {
  const {
    status,
    priority,
    category,
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
  if (priority) {
    query.priority = priority;
  }
  if (category) {
    // Use $in operator to check if category exists in the array
    query.category = { $in: [category] };
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
  updates: { 
    title?: string; 
    description?: string; 
    status?: "pending" | "completed";
    priority?: "low" | "medium" | "high";
    category?: string[];
    dueDate?: Date | null;
  }
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

  // Validate priority if provided
  if (updates.priority && !["low", "medium", "high"].includes(updates.priority)) {
    throw new ValidationError("Priority must be 'low', 'medium', or 'high'");
  }

  // Update fields
  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.status !== undefined) task.status = updates.status;
  if (updates.priority !== undefined) task.priority = updates.priority;
  if (updates.category !== undefined) task.category = updates.category;
  if (updates.dueDate !== undefined) {
    task.dueDate = updates.dueDate === null ? undefined : updates.dueDate;
  }

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
