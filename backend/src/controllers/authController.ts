/**
 * Authentication Controller
 * Handles auth-related HTTP requests
 */

import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
} from "../services/authService";
import { RegisterPayload, LoginPayload } from "../utils/validation";
import { AppError } from "../utils/errors";

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (
  req: Request<unknown, unknown, RegisterPayload>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await registerUser(email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (
  req: Request<unknown, unknown, LoginPayload>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("User not found in request", 401);
    }

    const user = await getUserById(req.user.userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
