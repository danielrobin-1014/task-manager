import api from "./api";
import type { ITask, ICreateTaskRequest, IUpdateTaskRequest } from "../types";

export const taskService = {
  // Get all tasks for logged-in user with optional filters
  getTasks: async (filters?: {
    status?: "pending" | "completed";
    priority?: "low" | "medium" | "high";
    category?: string;
    sortBy?: "createdAt" | "updatedAt" | "title" | "priority" | "dueDate";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
  }): Promise<{ tasks: ITask[]; total: number; page: number; totalPages: number }> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.priority) params.append("priority", filters.priority);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await api.get<{
      success: boolean;
      message: string;
      data: {
        tasks: ITask[];
        total: number;
        page: number;
        totalPages: number;
      };
    }>(`/tasks?${params.toString()}`);
    return response.data.data;
  },

  // Get single task by ID
  getTaskById: async (id: string): Promise<ITask> => {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: { task: ITask };
    }>(`/tasks/${id}`);
    return response.data.data.task;
  },

  // Create new task
  createTask: async (taskData: ICreateTaskRequest): Promise<ITask> => {
    const response = await api.post<{
      success: boolean;
      message: string;
      data: { task: ITask };
    }>("/tasks", taskData);
    return response.data.data.task;
  },

  // Update task
  updateTask: async (id: string, taskData: IUpdateTaskRequest): Promise<ITask> => {
    const response = await api.put<{
      success: boolean;
      message: string;
      data: { task: ITask };
    }>(`/tasks/${id}`, taskData);
    return response.data.data.task;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
