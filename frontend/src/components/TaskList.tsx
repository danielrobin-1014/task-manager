import React from "react";
import type { ITask } from "../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: ITask[];
  loading: boolean;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onEdit, onDelete, onToggleStatus }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5 overflow-hidden relative">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent z-10"></div>

            <div className="flex items-start gap-4 pl-2 opacity-70">
              <div className="pt-1">
                <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700/80 animate-pulse"></div>
              </div>

              <div className="flex-1 space-y-3 py-1">
                <div className="h-5 bg-slate-200 dark:bg-slate-700/80 rounded-lg w-2/3 animate-pulse"></div>
                <div className="h-3.5 bg-slate-200 dark:bg-slate-700/80 rounded-lg w-full max-w-[90%] animate-pulse" style={{ animationDelay: '75ms' }}></div>
                <div className="h-3.5 bg-slate-200 dark:bg-slate-700/80 rounded-lg w-4/5 animate-pulse" style={{ animationDelay: '150ms' }}></div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700/80 rounded-full animate-pulse" style={{ animationDelay: '225ms' }}></div>
                  <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700/80 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="glass bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-200/60 dark:border-slate-700/60 py-24 px-6 text-center transition-all duration-300 relative overflow-hidden group">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 dark:bg-violet-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-violet-500/15 dark:group-hover:bg-violet-500/10 transition-colors duration-700"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-violet-100 dark:bg-violet-900/40 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/40 rounded-3xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500 delay-75"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 text-violet-500 dark:text-violet-400 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">No tasks found</h3>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You're all caught up! Create a new task to keep your productivity flowing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative z-10">
      {tasks.map((task, index) => (
        <div
          key={task._id}
          style={{ animationDelay: `${index * 60}ms` }}
          className="animate-slideUp"
        >
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
