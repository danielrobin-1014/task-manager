export interface IUser {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  category: string[];
  dueDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
}

export interface ICreateTaskRequest {
  title: string;
  description?: string;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  category?: string[];
  dueDate?: string;
}

export interface IUpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  category?: string[];
  dueDate?: string | null;
}
