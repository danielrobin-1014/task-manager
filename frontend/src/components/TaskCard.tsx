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

  return (
    <div className={`group bg-white dark:bg-slate-800 border-l-4 border-t border-r border-b rounded-xl p-5 transition-all duration-200 hover:shadow-xl ${
      isPending 
        ? "border-l-amber-500 border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-900/50" 
        : "border-l-green-500 border-slate-200 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-900/50"
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
          <h3
            className={`text-base font-semibold mb-1 ${
              isPending ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 line-through"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isPending 
                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            }`}>
              {isPending ? "Pending" : "Completed"}
            </span>
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
