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
    <div
      className={`group relative glass bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isPending
          ? "border-slate-200/50 dark:border-slate-700/50 hover:border-violet-300/50 dark:hover:border-violet-700/50 hover:shadow-violet-500/10"
          : "border-emerald-200/50 dark:border-emerald-900/30 hover:border-emerald-300/50 dark:hover:border-emerald-700/50 hover:shadow-emerald-500/10"
        }`}
    >
      {/* Status Indicator Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-colors duration-300 ${isPending
            ? "bg-slate-200 dark:bg-slate-700 group-hover:bg-violet-400 dark:group-hover:bg-violet-500"
            : "bg-emerald-400 dark:bg-emerald-500"
          }`}
      ></div>

      <div className="flex items-start gap-4 pl-2">
        {/* Custom Checkbox */}
        <div className="pt-1">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={!isPending}
              onChange={() => onToggleStatus(task)}
              className="peer appearance-none w-6 h-6 border-2 border-slate-300 dark:border-slate-600 rounded-lg checked:bg-emerald-500 checked:border-emerald-500 hover:border-violet-400 dark:hover:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all cursor-pointer shadow-sm"
              title={isPending ? "Mark as completed" : "Mark as pending"}
            />
            <svg
              className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200 scale-50 peer-checked:scale-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-1.5 tracking-tight transition-all duration-300 ${isPending ? "text-slate-800 dark:text-slate-100" : "text-slate-400 dark:text-slate-500 line-through"
              }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mb-3 leading-relaxed transition-colors duration-300 ${isPending ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-500 line-through opacity-70"
              }`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${isPending
                ? "bg-violet-100/80 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50"
                : "bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50"
              }`}>
              {isPending ? (
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              )}
              {isPending ? "Pending" : "Completed"}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100/50 dark:bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>

        {/* Actions - Hidden by default, shown on hover or touch */}
        <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2.5 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 rounded-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            title="Edit task"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            title="Delete task"
            aria-label="Delete task"
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
