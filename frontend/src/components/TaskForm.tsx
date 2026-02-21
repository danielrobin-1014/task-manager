import React, { useState, useEffect } from "react";
import type { ITask, ICreateTaskRequest } from "../types";

interface TaskFormProps {
  task?: ITask;
  onSubmit: (data: ICreateTaskRequest) => void;
  onCancel: () => void;
  loading: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<"pending" | "completed">(task?.status || "pending");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const MAX_TITLE_LENGTH = 100;
  const MAX_DESC_LENGTH = 500;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
    }
  }, [task]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Title must be less than ${MAX_TITLE_LENGTH} characters`;
    }

    if (description && description.length > MAX_DESC_LENGTH) {
      newErrors.description = `Description must be less than ${MAX_DESC_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn" style={{ animationDelay: '50ms' }}>

      {/* Title Field */}
      <div className="group">
        <div className="flex justify-between items-end mb-1.5">
          <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <span className={`text-xs font-medium ${title.length > MAX_TITLE_LENGTH ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'}`}>
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-base transition-all duration-200 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 hover:bg-white dark:hover:bg-slate-900 shadow-sm ${errors.title ? "border-rose-400 dark:border-rose-500 focus:ring-rose-500/50 focus:border-rose-500" : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
              }`}
            placeholder="What needs to be done?"
            disabled={loading}
            autoFocus
          />
        </div>
        {errors.title && <p className="mt-1.5 text-sm text-rose-500 dark:text-rose-400 font-medium animate-slideUp">{errors.title}</p>}
      </div>

      {/* Description Field */}
      <div className="group">
        <div className="flex justify-between items-end mb-1.5">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Description <span className="text-slate-400 dark:text-slate-500 font-normal">(Optional)</span>
          </label>
          <span className={`text-xs font-medium ${description.length > MAX_DESC_LENGTH ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'}`}>
            {description.length}/{MAX_DESC_LENGTH}
          </span>
        </div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-base transition-all duration-200 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 hover:bg-white dark:hover:bg-slate-900 resize-none shadow-sm ${errors.description ? "border-rose-400 dark:border-rose-500 focus:ring-rose-500/50 focus:border-rose-500" : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
            }`}
          placeholder="Add details, links, or context to help complete this task..."
          disabled={loading}
        />
        {errors.description && <p className="mt-1.5 text-sm text-rose-500 dark:text-rose-400 font-medium animate-slideUp">{errors.description}</p>}
      </div>

      {/* Status Segmented Control */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Status
        </label>
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl relative border border-slate-200/50 dark:border-slate-700/50">
          <button
            type="button"
            onClick={() => setStatus("pending")}
            disabled={loading}
            className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${status === "pending" ? "text-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
          >
            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${status === "pending" ? "bg-violet-500" : "bg-slate-300 dark:bg-slate-600"}`}></span>
            To Do
          </button>

          <button
            type="button"
            onClick={() => setStatus("completed")}
            disabled={loading}
            className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${status === "completed" ? "text-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
          >
            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${status === "completed" ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`}></span>
            Completed
          </button>

          {/* Sliding indicator */}
          <div
            className="absolute top-1 bottom-1 w-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 ease-spring"
            style={{
              left: status === 'pending' ? '0.25rem' : 'calc(50% - 0.25rem)',
              width: 'calc(50% - 0.125rem)'
            }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/80">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 active:scale-[0.98] rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 flex items-center gap-2"
        >
          {loading && (
            <svg className="animate-spin -ml-1 h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {loading ? "Saving..." : task ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
