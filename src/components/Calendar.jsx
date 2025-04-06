import { useSelector } from "react-redux";
import { useState, useMemo, memo } from "react";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoClose,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleTask } from "../context/Slices/tasksSlice";
import PropTypes from "prop-types";

// Day Cell component to prevent re-renders of the entire calendar
const DayCell = memo(({ day, tasks, currentDate, onDayClick }) => {
  if (day === null) {
    return (
      <div className="min-h-[120px] bg-gray-50 p-2 opacity-50 dark:bg-gray-800" />
    );
  }

  const dayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    day,
  );
  const isToday = new Date().toDateString() === dayDate.toDateString();

  return (
    <div
      onClick={() => onDayClick(day, tasks)}
      className={`min-h-[120px] cursor-pointer p-2 transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 ${
        isToday
          ? "bg-indigo-100 dark:bg-indigo-900"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div
        className={`mb-2 flex justify-end ${isToday ? "font-bold" : "font-medium"}`}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            isToday
              ? "bg-indigo-600 text-white"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {day}
        </span>
      </div>

      {/* Tasks preview - only show up to 3 */}
      <div className="scrollbar-none max-h-[80px] space-y-1.5 overflow-hidden">
        {tasks && tasks.length > 0 && (
          <div className="text-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {tasks.length} Tasks
          </div>
        )}
      </div>
    </div>
  );
});

DayCell.displayName = "DayCell";

DayCell.propTypes = {
  day: PropTypes.number,
  tasks: PropTypes.array,
  currentDate: PropTypes.instanceOf(Date),
  dispatch: PropTypes.func.isRequired,
  onDayClick: PropTypes.func.isRequired,
};

// Calendar header component to reduce rerenders
const CalendarHeader = memo(({ currentDate, onPrevMonth, onNextMonth }) => {
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-4 flex items-center justify-between rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900">
      <button
        onClick={onPrevMonth}
        className="rounded-full p-1.5 text-indigo-800 hover:bg-indigo-100 dark:text-indigo-200 dark:hover:bg-indigo-800"
      >
        <IoChevronBackOutline className="h-6 w-6" />
      </button>
      <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-200">
        {formattedDate}
      </h3>
      <button
        onClick={onNextMonth}
        className="rounded-full p-1.5 text-indigo-800 hover:bg-indigo-100 dark:text-indigo-200 dark:hover:bg-indigo-800"
      >
        <IoChevronForwardOutline className="h-6 w-6" />
      </button>
    </div>
  );
});

CalendarHeader.displayName = "CalendarHeader";

CalendarHeader.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
};

const TaskDetailsModal = memo(
  ({ selectedDay, tasks, currentDate, onClose, dispatch }) => {
    if (!selectedDay) return null;

    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDay,
    );
    const formattedDate = dayDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity"
            aria-hidden="true"
          />

          <div
            className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Tasks for {formattedDate}
                    </h3>
                    <button
                      onClick={onClose}
                      className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-white"
                    >
                      <IoClose className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-2 max-h-96 overflow-y-auto">
                    {tasks.length === 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        No tasks for this day
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {tasks.map((task) => (
                          <li
                            key={task.id}
                            className={`rounded-lg border p-3 ${
                              task.completed
                                ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                                : task.priority === "High"
                                  ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                                  : task.priority === "Low"
                                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                                    : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => dispatch(toggleTask(task.id))}
                                className="h-4 w-4 rounded-full border-2 border-indigo-300 text-indigo-600 focus:ring-indigo-500 dark:border-indigo-500 dark:focus:ring-indigo-400"
                              />
                              <div
                                className={`flex-1 ${
                                  task.completed
                                    ? "text-gray-400 line-through dark:text-gray-500"
                                    : "text-gray-800 dark:text-gray-200"
                                }`}
                              >
                                <div className="font-medium">{task.text}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                                    {task.category}
                                  </span>
                                  <span
                                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                                      task.priority === "High"
                                        ? "bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-300"
                                        : task.priority === "Low"
                                          ? "bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300"
                                          : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                                    }`}
                                  >
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TaskDetailsModal.displayName = "TaskDetailsModal";

TaskDetailsModal.propTypes = {
  selectedDay: PropTypes.number,
  tasks: PropTypes.array,
  currentDate: PropTypes.instanceOf(Date),
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const Calendar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayTasks, setDayTasks] = useState([]);

  // Create an array of day cells for the current month
  const dayCells = useMemo(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate(); //example: 30 for April

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay(); //example: 0 for Sunday

    // Group tasks by day
    const tasksByDay = {};

    tasks.forEach((task) => {
      const taskDate = new Date(task.date);
      if (
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      ) {
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
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
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
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="p-2 text-center font-semibold text-gray-700 dark:text-gray-300"
        >
          {day}
        </div>
      )),
    [],
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-900">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />

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
