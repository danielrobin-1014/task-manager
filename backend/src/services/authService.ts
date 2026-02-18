/**
 * Authentication Service
 * Handles JWT token generation, user creation, and login logic
 */

import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ValidationError, AuthenticationError, NotFoundError } from "../utils/errors";
import { IJWTPayload, IAuthResponse, IUserResponse } from "../types";

/**
 * Generate JWT token
 */
export const generateToken = (userId: string, email: string): string => {
  const secret: string = process.env.JWT_SECRET || "your_jwt_secret_key";
  const expiry: string = process.env.JWT_EXPIRY || "7d";

  const payload: IJWTPayload = {
    userId,
    email,
  };

  return jwt.sign(payload, secret, { expiresIn: expiry } as jwt.SignOptions);
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): IJWTPayload => {
  const secret = process.env.JWT_SECRET || "your_jwt_secret_key";

  try {
    const decoded = jwt.verify(token, secret) as IJWTPayload;
    return decoded;
  } catch (error) {
    throw new AuthenticationError("Invalid or expired token");
  }
};

/**
 * Register a new user
 */
export const registerUser = async (email: string, password: string): Promise<IAuthResponse> => {
  // Validate input
  if (!email || !password) {
    throw new ValidationError("Email and password are required");
  }

  if (password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters long");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ValidationError("Email already registered");
  }

  // Create new user
  const user = new User({ email, password });
  await user.save();

  // Generate token
  const token = generateToken(user._id as string, user.email);

  // Return without password
  const userObj = user.toObject();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userResponse } = userObj;

  return {
    token,
    user: userResponse as IUserResponse,
  };
};

/**
 * Login user
 */
export const loginUser = async (email: string, password: string): Promise<IAuthResponse> => {
  // Validate input
  if (!email || !password) {
    throw new ValidationError("Email and password are required");
  }

  // Find user by email (include password field for comparison)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AuthenticationError("Invalid email or password");
  }

  // Compare passwords
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AuthenticationError("Invalid email or password");
  }

  // Generate token
  const token = generateToken(user._id as string, user.email);

  // Return user without password
  const userObj = user.toObject();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userResponse } = userObj;

  return {
    token,
    user: userResponse as IUserResponse,
  };
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<IUserResponse> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User");
  }

  const userObj = user.toObject();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userResponse } = userObj;

  return userResponse as IUserResponse;
};
