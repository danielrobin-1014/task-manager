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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F0F1A] transition-colors relative overflow-hidden">
      {/* Decorative Dashboard Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-100/50 to-transparent dark:from-indigo-900/20 dark:to-transparent pointer-events-none -translate-y-24"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-violet-300/20 dark:bg-violet-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute top-64 left-0 w-[600px] h-[500px] bg-blue-300/20 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3"></div>

      <Navbar onCreateTask={handleCreateTask} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 animate-fadeIn" style={{ animationDelay: '100ms' }}>

        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">My Workspace</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Here's what's happening with your tasks today.</p>
          </div>
          <button
            onClick={handleCreateTask}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-600/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Task
          </button>
        </div>

        {/* Stats Grid - Premium Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="glass backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-slate-700/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-md hover:shadow-violet-500/10 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide uppercase mb-1">Total Tasks</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{allData?.total || 0}</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 flex items-center justify-center border border-violet-200/50 dark:border-violet-700/30 shadow-inner">
                <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-slate-700/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-md hover:shadow-amber-500/10 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide uppercase mb-1">Pending</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{pendingData?.total || 0}</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center border border-amber-200/50 dark:border-amber-700/30 shadow-inner">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-slate-700/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide uppercase mb-1">Completed</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{completedData?.total || 0}</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-700/30 shadow-inner">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Toolbar - Filters and Search */}
        <div className="glass border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-2 mb-8 shadow-sm max-w-3xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4">

            {/* Pill-style Filter Tabs */}
            <div className="flex p-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl relative">
              <button
                onClick={() => setActiveFilter("all")}
                className={`relative z-10 flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${activeFilter === "all" ? "text-violet-700 dark:text-violet-300" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("pending")}
                className={`relative z-10 flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${activeFilter === "pending" ? "text-violet-700 dark:text-violet-300" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`relative z-10 flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${activeFilter === "completed" ? "text-violet-700 dark:text-violet-300" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
              >
                Completed
              </button>

              {/* Sliding Active Background */}
              <div
                className="absolute top-1 bottom-1 w-1/3 min-w-[70px] bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 ease-in-out"
                style={{
                  left: activeFilter === 'all' ? '0.25rem' : activeFilter === 'pending' ? 'calc(33.33% + 0.125rem)' : 'calc(66.66% - 0.25rem)',
                  width: 'calc(33.33% - 0.25rem)'
                }}
              ></div>
            </div>

            {/* Smart Search Bar */}
            <div className="relative group flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-xl px-4 py-2 pl-10 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <svg className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="animate-slideUp" style={{ animationDelay: '200ms' }}>
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

      {/* Premium Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Task"
      >
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-1">Permanently delete task?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                This action cannot be undone. This will permanently remove the task and all associated data from our servers.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={deleteTask.isPending}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-[0.98] rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-red-500/25 flex items-center gap-2"
            >
              {deleteTask.isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Deleting...
                </>
              ) : "Yes, delete task"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
