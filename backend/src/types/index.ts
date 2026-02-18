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

export interface IUserResponse {
  _id?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export interface IAuthResponse {
  token: string;
  user: IUserResponse;
}

export interface IErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
