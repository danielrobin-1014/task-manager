import { useEffect } from "react";
import toast from "react-hot-toast";
import type { ITask } from "../types";

/**
 * Hook to check for tasks with upcoming or overdue due dates
 * Displays browser notifications for reminders
 */
export const useTaskReminders = (tasks: ITask[]) => {
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Check for overdue and upcoming tasks
    const overdueTasks = tasks.filter(
      (task) =>
        task.status === "pending" &&
        task.dueDate &&
        new Date(task.dueDate) < now
    );

    const upcomingTasks = tasks.filter(
      (task) =>
        task.status === "pending" &&
        task.dueDate &&
        new Date(task.dueDate) > now &&
        new Date(task.dueDate) <= oneDayFromNow
    );

    // Show toasts for overdue tasks (once per session)
    if (overdueTasks.length > 0) {
      const shownOverdue = sessionStorage.getItem("shownOverdueReminders");
      const overdueIds = overdueTasks.map((t) => t._id).sort().join(",");

      if (shownOverdue !== overdueIds) {
        const message =
          overdueTasks.length === 1
            ? `URGENT: 1 overdue task - "${overdueTasks[0].title}"`
            : `URGENT: ${overdueTasks.length} overdue tasks!`;

        toast.error(message, {
          duration: 8000,
        });

        sessionStorage.setItem("shownOverdueReminders", overdueIds);
      }
    }

    // Show toasts for upcoming tasks
    if (upcomingTasks.length > 0) {
      const shownUpcoming = sessionStorage.getItem("shownUpcomingReminders");
      const upcomingIds = upcomingTasks.map((t) => t._id).sort().join(",");

      if (shownUpcoming !== upcomingIds) {
        const message =
          upcomingTasks.length === 1
            ? `Task due soon: "${upcomingTasks[0].title}"`
            : `${upcomingTasks.length} tasks due within 24 hours`;

        toast(message, {
          duration: 5000,
          style: {
            background: "#3B82F6",
            color: "#fff",
          },
        });

        sessionStorage.setItem("shownUpcomingReminders", upcomingIds);
      }
    }

    // Request browser notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Send browser notifications for overdue tasks
    if (
      "Notification" in window &&
      Notification.permission === "granted" &&
      overdueTasks.length > 0
    ) {
      const notificationShown = sessionStorage.getItem("browserNotificationShown");
      if (!notificationShown) {
        new Notification("TaskFlow - Overdue Tasks", {
          body: `You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? "s" : ""}!`,
          icon: "/favicon.ico",
          tag: "overdue-tasks",
        });
        sessionStorage.setItem("browserNotificationShown", "true");
      }
    }
  }, [tasks]);
};
