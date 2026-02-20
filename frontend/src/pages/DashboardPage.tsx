import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "../hooks/useTasks";
import type { ITask, ICreateTaskRequest } from "../types";

type FilterTab = "all" | "pending" | "completed";

const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | undefined>(undefined);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tasks based on active filter
  const { data, isLoading } = useTasks(
    activeFilter !== "all" ? { status: activeFilter } : undefined
  );

  const tasks = data?.tasks || [];
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  // Fetch all stats
  const { data: allData } = useTasks();
  const { data: pendingData } = useTasks({ status: "pending" });
  const { data: completedData } = useTasks({ status: "completed" });

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitTask = async (data: ICreateTaskRequest) => {
    try {
      if (editingTask) {
        await updateTask.mutateAsync({ id: editingTask._id, data });
        toast.success("Task updated successfully!");
      } else {
        await createTask.mutateAsync(data);
        toast.success("Task created successfully!");
      }
      setIsModalOpen(false);
      setEditingTask(undefined);
    } catch (error) {
      toast.error(editingTask ? "Failed to update task" : "Failed to create task");
      console.error("Failed to save task:", error);
    }
  };

  const handleDeleteTask = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      try {
        await deleteTask.mutateAsync(deleteConfirm);
        toast.success("Task deleted successfully!");
        setDeleteConfirm(null);
      } catch (error) {
        toast.error("Failed to delete task");
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleToggleStatus = async (task: ITask) => {
    try {
      await updateTask.mutateAsync({
        id: task._id,
        data: { status: task.status === "pending" ? "completed" : "pending" },
      });
      toast.success(
        task.status === "pending" ? "Task marked as completed!" : "Task marked as pending!"
      );
    } catch (error) {
      toast.error("Failed to update task status");
      console.error("Failed to update task status:", error);
    }
  };

  // Filter tasks by search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar onCreateTask={handleCreateTask} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Tasks</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{allData?.total || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500 mt-2">{pendingData?.total || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-500 mt-2">{completedData?.total || 0}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All ({allData?.total || 0})
              </button>
              <button
                onClick={() => setActiveFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Pending ({pendingData?.total || 0})
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Completed ({completedData?.total || 0})
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Tasks</h2>
          <TaskList
            tasks={filteredTasks}
            loading={isLoading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </main>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(undefined);
        }}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTask(undefined);
          }}
          loading={createTask.isPending || updateTask.isPending}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Task"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={deleteTask.isPending}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
            >
              {deleteTask.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
