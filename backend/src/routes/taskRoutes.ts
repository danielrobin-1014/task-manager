/**
 * Task Routes
 */

import { Router } from "express";
import { create, getAll, getOne, update, remove } from "../controllers/taskController";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { createTaskSchema, updateTaskSchema } from "../utils/validation";

const router = Router();

// All task routes require authentication
router.use(authMiddleware);

/**
 * POST /api/tasks
 * Create a new task
 */
router.post("/", validateRequest(createTaskSchema), create);

/**
 * GET /api/tasks
 * Get all tasks for authenticated user
 */
router.get("/", getAll);

/**
 * GET /api/tasks/:id
 * Get a single task by ID
 */
router.get("/:id", getOne);

/**
 * PUT /api/tasks/:id
 * Update a task
 */
router.put("/:id", validateRequest(updateTaskSchema), update);

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete("/:id", remove);

export default router;
