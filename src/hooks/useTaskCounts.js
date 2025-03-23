import { useMemo } from "react";
import { useSelector } from "react-redux";

const useTaskCounts = () => {
  const tasks = useSelector((state) => state.tasks);

  const taskCounts = useMemo(() => {
    const today = new Date();
    const todayString = today.toDateString();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Pre-filter the tasks by common conditions
    const completedTasks = tasks.filter((task) => task.completed);
    const activeTasks = tasks.filter((task) => !task.completed);
    const highPriorityTasks = tasks.filter(
      (task) => task.priority?.toLowerCase() === "high",
    );

    // Calculate date-related counts
    const todayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === todayString;
    });

    const upcomingTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate > today && taskDate.toDateString() !== todayString;
    });

    const recentTasks = tasks.filter((task) => {
      const createdDate = new Date(task.createdAt || task.date);
      return createdDate >= oneWeekAgo;
    });

    return {
      all: tasks.length,
      today: todayTasks.length,
      upcoming: upcomingTasks.length,
      completed: completedTasks.length,
      high: highPriorityTasks.length,
      active: activeTasks.length,
      recent: recentTasks.length,
      calendar: tasks.length,
    };
  }, [tasks]);

  return taskCounts;
};

export default useTaskCounts;
