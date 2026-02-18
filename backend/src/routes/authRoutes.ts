/**
 * Authentication Routes
 */

import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { registerSchema, loginSchema } from "../utils/validation";

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", validateRequest(registerSchema), register);

/**
 * POST /api/auth/login
 * Login user and get JWT token
 */
router.post("/login", validateRequest(loginSchema), login);

/**
 * GET /api/auth/me
 * Get current authenticated user (Protected)
 */
router.get("/me", authMiddleware, getCurrentUser);

export default router;
