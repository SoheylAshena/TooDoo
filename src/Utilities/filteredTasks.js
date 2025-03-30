// Optimized filtering functions
const cache = {
  filtered: new Map(),
  lastCall: null,
};

// Generate a cache key
const generateCacheKey = (tasks, filterOptions) => {
  const tasksStateHash = tasks
    .map((task) => `${task.id}:${task.completed}`)
    .join("|");
  return `${tasksStateHash}_${JSON.stringify(filterOptions)}`;
};

export const filteredData = (tasks, filterOptions) => {
  const cacheKey = generateCacheKey(tasks, filterOptions);
  if (cache.filtered.has(cacheKey)) {
    return cache.filtered.get(cacheKey);
  }

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
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sort === "date-desc") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
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

  // Cache the result
  cache.filtered.set(cacheKey, filtered);

  // Keep cache size manageable
  if (cache.filtered.size > 100) {
    // Remove oldest entries if cache gets large
    const keyToDelete = cache.filtered.keys().next().value;
    cache.filtered.delete(keyToDelete);
  }

  return filtered;
};
