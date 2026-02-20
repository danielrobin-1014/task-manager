import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService";
import type { ICreateTaskRequest, IUpdateTaskRequest } from "../types";

// Query keys
export const taskKeys = {
  all: ["tasks"] as const,
  list: (filters?: {
    status?: "pending" | "completed";
    sortBy?: "createdAt" | "updatedAt" | "title";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
  }) => ["tasks", filters] as const,
  detail: (id: string) => ["tasks", id] as const,
};

// Fetch all tasks with optional filters
export const useTasks = (filters?: {
  status?: "pending" | "completed";
  sortBy?: "createdAt" | "updatedAt" | "title";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => taskService.getTasks(filters),
  });
};

// Fetch single task
export const useTask = (id: string) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
  });
};

// Create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateTaskRequest) => taskService.createTask(data),
    onSettled: () => {
      // Invalidate all task queries to refetch with updated data
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateTaskRequest }) =>
      taskService.updateTask(id, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
