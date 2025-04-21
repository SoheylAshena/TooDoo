import { useSelector } from 'react-redux';
import { useState, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';

import DayCell from './DayCell';
import CalendarHeader from './CalendarHeader';
import TaskDetailsModal from './TaskDetailModal';

const Calendar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayTasks, setDayTasks] = useState([]);

  // Create an array of day cells for the current month
  const dayCells = useMemo(() => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); //example: 30 for April

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); //example: 0 for Sunday

    // Group tasks by day
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

    // Create calendar grid (6 rows x 7 columns)
    const cells = [];
    let dayCounter = 1;
    let emptyCellsAtStart = firstDayOfMonth;

    // Add empty cells for days before the month starts
    for (let i = 0; i < emptyCellsAtStart; i++) {
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
  }, [currentDate, tasks]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const handleDayClick = (day, tasks) => {
    setSelectedDay(day);
    setDayTasks(tasks || []);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setDayTasks([]);
  };

  // Memoized weekday headers
  const weekDays = useMemo(
    () =>
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="p-2 text-center font-semibold text-gray-700 dark:text-gray-300">
          {day}
        </div>
      )),
    [],
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-900">
      <CalendarHeader currentDate={currentDate} onPrevMonth={goToPreviousMonth} onNextMonth={goToNextMonth} />

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {weekDays}

        {dayCells.map((cell, index) => (
          <DayCell
            key={`cell-${index}`}
            day={cell?.day || null}
            tasks={cell?.tasks || []}
            currentDate={currentDate}
            dispatch={dispatch}
            onDayClick={handleDayClick}
          />
        ))}
      </div>

      {selectedDay && (
        <TaskDetailsModal
          selectedDay={selectedDay}
          tasks={dayTasks}
          currentDate={currentDate}
          onClose={closeModal}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default memo(Calendar);
