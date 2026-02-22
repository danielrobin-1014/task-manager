import React from "react";
import { formatDistanceToNow } from "date-fns";
import type { ITask } from "../types";

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: ITask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const isPending = task.status === "pending";

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "low":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      default:
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800";
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && isPending;

  return (
    <div className={`group rounded-xl p-5 transition-all duration-200 hover:shadow-xl ${
      isOverdue
        ? "bg-red-50 dark:bg-red-900/10 border-l-4 border-l-red-500 border-t border-r border-b border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
        : isPending 
          ? "bg-white dark:bg-slate-800 border-l-4 border-l-amber-500 border-t border-r border-b border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-900/50" 
          : "bg-white dark:bg-slate-800 border-l-4 border-l-green-500 border-t border-r border-b border-slate-200 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-900/50"
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={!isPending}
          onChange={() => onToggleStatus(task)}
          className="mt-1 h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 border-slate-300 dark:border-slate-600 rounded cursor-pointer transition-all"
        />

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {/* Overdue Warning Banner */}
          {isOverdue && (
            <div className="mb-2 flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg">
              <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-red-700 dark:text-red-400">OVERDUE TASK</span>
            </div>
          )}
          <h3
            className={`text-base font-semibold mb-1 ${
              isPending ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 line-through"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{task.description}</p>
          )}
          
          {/* Priority, Categories, and Due Date */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* Priority Badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
              <span className="capitalize font-semibold">{task.priority}</span>
            </span>

            {/* Status Badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isPending 
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            }`}>
              {isPending ? "Pending" : "Completed"}
            </span>

            {/* Due Date Badge */}
            {task.dueDate && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isOverdue 
                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800" 
                  : "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400"
              }`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(task.dueDate).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                {isOverdue && " (Overdue)"}
              </span>
            )}
          </div>

          {/* Categories/Tags */}
          {task.category && task.category.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {task.category.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-500">
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all hover:scale-110"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all hover:scale-110"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
