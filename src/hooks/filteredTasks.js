import { useSelector } from "react-redux";

export const useFilteredTasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const filterOptions = useSelector((state) => state.filters);

  let result = [...tasks];

  // Apply status filter
  if (filterOptions.status === "active") {
    result = result.filter((task) => !task.completed);
  } else if (filterOptions.status === "completed") {
    result = result.filter((task) => task.completed);
  }

  // Apply category filter
  if (filterOptions.category !== "all") {
    if (filterOptions.category === "today") {
      // Today's tasks
      result = result.filter((task) => {
        const taskDate = new Date(task.date);
        const today = new Date();
        return taskDate.toDateString() === today.toDateString();
      });
    } else if (filterOptions.category === "upcoming") {
      // Upcoming tasks (future dates except today)
      result = result.filter((task) => {
        const taskDate = new Date(task.date);
        const today = new Date();
        return (
          taskDate > today && taskDate.toDateString() !== today.toDateString()
        );
      });
    } else if (filterOptions.category === "recent") {
      // Recently added tasks (within last 7 days)
      result = result.filter((task) => {
        const createdDate = new Date(task.createdAt || task.date);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return createdDate >= oneWeekAgo;
      });
    } else {
      // Standard category filtering by name
      result = result.filter(
        (task) => task.category === filterOptions.category,
      );
    }
  }

  // Apply priority filter
  if (filterOptions.priority !== "all") {
    result = result.filter(
      (task) =>
        task.priority?.toLowerCase() === filterOptions.priority.toLowerCase(),
    );
  }

  // Apply search filter
  if (filterOptions.search) {
    const searchLower = filterOptions.search.toLowerCase();
    result = result.filter((task) => {
      return (
        task.text.toLowerCase().includes(searchLower) ||
        task.category.toLowerCase().includes(searchLower) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });
  }

  // Apply time filter
  if (filterOptions.time !== "all") {
    result = result.filter((task) => {
      const taskDate = new Date(task.date);
      const today = new Date();
      if (filterOptions.time === "today") {
        return taskDate.toDateString() === today.toDateString();
      } else if (filterOptions.time === "upcoming") {
        return (
          taskDate > today && taskDate.toDateString() !== today.toDateString()
        );
      } else if (filterOptions.time === "recent") {
        const createdDate = new Date(task.createdAt || task.date);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return createdDate >= oneWeekAgo;
      }
      return true;
    });
  }

  // Apply tags filter
  if (filterOptions.tags.length > 0) {
    result = result.filter((task) => {
      return filterOptions.tags.some((tag) => task.tags.includes(tag));
    });
  }

  // Apply partners filter
  if (filterOptions.partners.length > 0) {
    result = result.filter((task) => {
      return filterOptions.partners.some((partner) =>
        task.partners.includes(partner),
      );
    });
  }
  // Apply sorting
  if (filterOptions.sort === "date-desc") {
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filterOptions.sort === "date-asc") {
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (filterOptions.sort === "priority") {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    result.sort((a, b) => {
      return (
        priorityOrder[a.priority?.toLowerCase() || "medium"] -
        priorityOrder[b.priority?.toLowerCase() || "medium"]
      );
    });
  }

  return result;
};
