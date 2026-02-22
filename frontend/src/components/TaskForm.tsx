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
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium");
  const [category, setCategory] = useState<string[]>(task?.category || []);
  const [categoryInput, setCategoryInput] = useState("");
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split('T')[0] : "");
  const [dueTime, setDueTime] = useState(task?.dueDate ? new Date(task.dueDate).toTimeString().slice(0, 5) : "");
  const [errors, setErrors] = useState<{ title?: string; description?: string; category?: string }>({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
      setCategory(task.category || []);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : "");
      setDueTime(task.dueDate ? new Date(task.dueDate).toTimeString().slice(0, 5) : "");
    }
  }, [task]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string; category?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (description && description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (category.length > 10) {
      newErrors.category = "Maximum 10 categories allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !category.includes(trimmed) && category.length < 10) {
      setCategory([...category, trimmed]);
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (tag: string) => {
    setCategory(category.filter(t => t !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCategory();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Combine date and time into ISO datetime string
    let dueDateTimeString: string | undefined = undefined;
    if (dueDate) {
      if (dueTime) {
        // Combine date and time
        dueDateTimeString = `${dueDate}T${dueTime}:00.000Z`;
      } else {
        // If only date is provided, set time to 23:59
        dueDateTimeString = `${dueDate}T23:59:00.000Z`;
      }
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      category: category.length > 0 ? category : undefined,
      dueDate: dueDateTimeString,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white dark:bg-slate-900 dark:text-white ${
            errors.title ? "border-red-400" : "border-slate-300 dark:border-slate-600"
          }`}
          placeholder="Enter task title"
          disabled={loading}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none bg-white dark:bg-slate-900 dark:text-white ${
            errors.description ? "border-red-400" : "border-slate-300 dark:border-slate-600"
          }`}
          placeholder="Enter task description (optional)"
          disabled={loading}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
      </div>

      {/* Status and Priority Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "pending" | "completed")}
            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white dark:bg-slate-900 dark:text-white"
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Field */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white dark:bg-slate-900 dark:text-white"
            disabled={loading}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

     {/* Due Date Field */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Due Date & Time (Optional)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="dueDate" className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
              Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white dark:bg-slate-900 dark:text-white"
              disabled={loading}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label htmlFor="dueTime" className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
              Time
            </label>
            <input
              type="time"
              id="dueTime"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white dark:bg-slate-900 dark:text-white"
              disabled={loading || !dueDate}
            />
          </div>
        </div>
        {dueDate && dueTime && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Reminder set for: {new Date(`${dueDate}T${dueTime}`).toLocaleString()}
          </p>
        )}
      </div>

      {/* Category/Tags Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Categories/Tags (Max 10)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white dark:bg-slate-900 dark:text-white"
            placeholder="Add category (e.g., Work, Personal)"
            disabled={loading || category.length >= 10}
            maxLength={50}
          />
          <button
            type="button"
            onClick={handleAddCategory}
            disabled={loading || !categoryInput.trim() || category.length >= 10}
            className="px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        {errors.category && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
        
        {/* Display categories/tags */}
        {category.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {category.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(tag)}
                  className="hover:text-teal-900 dark:hover:text-teal-100 transition-colors"
                  disabled={loading}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-lg transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg"
        >
          {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
