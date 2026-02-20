export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
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
  name: string;
  email: string;
  password: string;
}

export interface ICreateTaskRequest {
  title: string;
  description?: string;
  status?: "pending" | "completed";
}

export interface IUpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "pending" | "completed";
}
