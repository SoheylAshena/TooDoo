export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const groupTasksByDay = (tasks, currentDate) => {
  const tasksByDay = {};

  tasks.forEach((task) => {
    const taskDate = new Date(task.date);
    if (taskDate.getMonth() === currentDate.getMonth() && taskDate.getFullYear() === currentDate.getFullYear()) {
      const day = taskDate.getDate();
      if (!tasksByDay[day]) {
        tasksByDay[day] = [];
      }
      tasksByDay[day].push(task);
    }
  });

  return tasksByDay;
};

export const generateCalendarCells = (daysInMonth, firstDayOfMonth, tasksByDay) => {
  const cells = [];
  let dayCounter = 1;

  // Add empty cells for days before the month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(null);
  }

  // Add cells for all days in the month
  while (dayCounter <= daysInMonth) {
    cells.push({
      day: dayCounter,
      tasks: tasksByDay[dayCounter] || [],
    });
    dayCounter++;
  }

  // Add empty cells at the end to complete the grid
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};
