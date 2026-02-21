import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService";
import type { ICreateTaskRequest, IUpdateTaskRequest } from "../types";

// Query keys
export const taskKeys = {
  all: ["tasks"] as const,
  list: (filters?: {
    status?: "pending" | "completed";
    priority?: "low" | "medium" | "high";
    category?: string;
    sortBy?: "createdAt" | "updatedAt" | "title" | "priority" | "dueDate";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
  }) => ["tasks", filters] as const,
  detail: (id: string) => ["tasks", id] as const,
};

// Fetch all tasks with optional filters
export const useTasks = (filters?: {
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  category?: string;
  sortBy?: "createdAt" | "updatedAt" | "title" | "priority" | "dueDate";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => taskService.getTasks(filters),
    staleTime: 0, // Always refetch on mount
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
    onSuccess: () => {
      // Invalidate and refetch all task queries immediately
      queryClient.invalidateQueries({ queryKey: ["tasks"], refetchType: "all" });
    },
  });
};

// Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateTaskRequest }) =>
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], refetchType: "all" });
    },
  });
};

// Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], refetchType: "all" });
    },
  });
};
