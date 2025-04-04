export const filteredData = (tasks, filterOptions) => {
  const { status, priority, time, search, category, sort } = filterOptions;

  let filtered = [...tasks];

  if (search) {
    const lowercasedSearch = search.toLowerCase();
    filtered = filtered.filter(
      (task) =>
        task.text.toLowerCase().includes(lowercasedSearch) ||
        task.category.toLowerCase().includes(lowercasedSearch) ||
        (task.tags &&
          task.tags.some((tag) =>
            tag.toLowerCase().includes(lowercasedSearch),
          )),
    );
  }

  // Handle status filter
  if (status !== "all") {
    if (status === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (status === "active") {
      filtered = filtered.filter((task) => !task.completed);
    }
  }

  // Handle priority filter
  if (priority !== "all") {
    const lowercasedPriority = priority.toLowerCase();
    filtered = filtered.filter(
      (task) =>
        task.priority && task.priority.toLowerCase() === lowercasedPriority,
    );
  }

  // Handle time filter
  if (time !== "all") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (time === "today") {
      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      });
    } else if (time === "upcoming") {
      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate > today;
      });
    } else if (time === "recent") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      filtered = filtered.filter((task) => {
        const createdDate = new Date(task.createdAt || task.date);
        return createdDate >= sevenDaysAgo;
      });
    }
  }

  // Handle category filter
  if (category !== "all") {
    filtered = filtered.filter((task) => task.category === category);
  }

  // Apply sorting
  if (sort === "date-asc") {
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === "date-desc") {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "priority") {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    filtered.sort((a, b) => {
      const aValue =
        priorityValues[(a.priority || "medium").toLowerCase()] || 0;
      const bValue =
        priorityValues[(b.priority || "medium").toLowerCase()] || 0;
      return bValue - aValue;
    });
  }

  return filtered;
};
