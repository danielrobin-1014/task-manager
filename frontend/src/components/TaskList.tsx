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
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 py-20 text-center transition-colors">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
          <svg
            className="h-8 w-8 text-slate-400 dark:text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-base font-medium text-slate-900 dark:text-white mb-1">No tasks yet</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task._id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-fadeIn"
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
