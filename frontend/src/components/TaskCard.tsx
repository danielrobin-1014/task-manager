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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={!isPending}
            onChange={() => onToggleStatus(task)}
            className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded cursor-pointer"
          />

          {/* Task Content */}
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                isPending ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400 line-through"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{task.description}</p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isPending
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
              : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
          }`}
        >
          {isPending ? "Pending" : "Completed"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400" title={new Date(task.createdAt).toLocaleString()}>
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </span>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
