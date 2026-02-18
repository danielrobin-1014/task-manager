/**
 * Task Controller
 * Handles task-related HTTP requests
 */

import { Request, Response, NextFunction } from "express";
import {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { AppError } from "../utils/errors";

/**
 * Create a new task
 * POST /api/tasks
 */
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    const { title, description } = req.body;
    const task = await createTask(req.user.userId, title, description);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all tasks for authenticated user
 * GET /api/tasks
 */
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    const tasks = await getUserTasks(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: { tasks, count: tasks.length },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single task by ID
 * GET /api/tasks/:id
 */
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    const { id } = req.params;
    const task = await getTaskById(id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task
 * PUT /api/tasks/:id
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await updateTask(id, req.user.userId, {
      title,
      description,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task
 * DELETE /api/tasks/:id
 */
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    const { id } = req.params;
    await deleteTask(id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
