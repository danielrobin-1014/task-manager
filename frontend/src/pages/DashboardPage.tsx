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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <Navbar onCreateTask={handleCreateTask} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{allData?.total || 0}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">{pendingData?.total || 0}</p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-green-200 dark:border-green-900/50 rounded-xl p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{completedData?.total || 0}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6 transition-colors shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setActiveFilter("pending")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === "pending"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === "completed"
                    ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                Completed
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 px-4 py-2.5 pl-10 border border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm shadow-sm"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition"
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
        <TaskList
          tasks={filteredTasks}
          loading={isLoading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
        />
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
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">Are you sure?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                This will permanently delete the task. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={deleteTask.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-lg transition-all duration-200 disabled:opacity-50 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
            >
              {deleteTask.isPending ? "Deleting..." : "Delete Task"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
