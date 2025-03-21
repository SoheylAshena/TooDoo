export const filteredData = (tasks, filterOptions) => {
  let result = [...tasks];

  // Apply status filter
  if (filterOptions.status === "active") {
    result = result.filter((task) => !task.completed);
  } else if (filterOptions.status === "completed") {
    result = result.filter((task) => task.completed);
  }

  // Apply category filter
  if (filterOptions.category !== "all") {
    result = result.filter(
      (task) =>
        task.category.toLowerCase() === filterOptions.category.toLowerCase(),
    );
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
    const today = new Date();
    const todayStr = today.toDateString();

    result = result.filter((task) => {
      if (filterOptions.time === "today") {
        return new Date(task.date).toDateString() === todayStr;
      } else if (filterOptions.time === "upcoming") {
        const taskDate = new Date(task.date);
        return taskDate > today && taskDate.toDateString() !== todayStr;
      } else if (filterOptions.time === "recent") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(task.createdAt || task.date) >= oneWeekAgo;
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
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (filterOptions.sort === "date-asc") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
