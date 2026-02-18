/**
 * Type definitions for the application
 */

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask {
  _id?: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJWTPayload {
  userId: string;
  email: string;
}

export interface IAuthResponse {
  token: string;
  user: Omit<IUser, "password">;
}

export interface IErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
