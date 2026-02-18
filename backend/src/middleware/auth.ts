/**
 * JWT Authentication middleware
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../utils/errors";
import { IJWTPayload } from "../types";

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      user?: IJWTPayload;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("Missing or invalid authorization header");
    }

    const token = authHeader.substring(7);
    const secret = process.env.JWT_SECRET || "your_jwt_secret_key";

    const decoded = jwt.verify(token, secret) as IJWTPayload;
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError("Invalid token");
  }
};
