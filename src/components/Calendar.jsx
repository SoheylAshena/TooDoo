import { useSelector } from "react-redux";
import { useState, useMemo, Fragment } from "react";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoClose,
} from "react-icons/io5";
import { filteredData } from "../Utilities/filteredTasks";
import { useDispatch } from "react-redux";
import { toggleTask } from "../context/Slices/tasksSlice";
import PropTypes from "prop-types";

// Day Cell component to prevent re-renders of the entire calendar
const DayCell = ({ day, tasks, currentDate, dispatch, onDayClick }) => {
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
      <div className="max-h-[80px] space-y-1.5 overflow-y-auto">
        {tasks?.slice(0, 3).map((task) => (
          <div
            key={task.id}
            className={`rounded-lg ${
              task.completed
                ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                : task.priority === "High"
                  ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                  : task.priority === "Low"
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
            } border p-1.5 text-xs`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  dispatch(toggleTask(task.id));
                }}
                className="h-3 w-3 rounded-full border-2 border-indigo-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div
                className={`truncate font-medium ${
                  task.completed
                    ? "text-gray-400 line-through dark:text-gray-500"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {task.text}
              </div>
            </div>
          </div>
        ))}
        {tasks && tasks.length > 3 && (
          <div className="text-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
            +{tasks.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

DayCell.propTypes = {
  day: PropTypes.number,
  tasks: PropTypes.array,
  currentDate: PropTypes.instanceOf(Date),
  dispatch: PropTypes.func.isRequired,
  onDayClick: PropTypes.func.isRequired,
};

const TaskDetailsModal = ({
  selectedDay,
  tasks,
  currentDate,
  onClose,
  dispatch,
}) => {
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

                {tasks && tasks.length > 0 ? (
                  <div className="mt-2 max-h-[60vh] space-y-3 overflow-y-auto">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`rounded-lg border ${
                          task.completed
                            ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                            : task.priority === "High"
                              ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                              : task.priority === "Low"
                                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                                : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
                        } p-3`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch(toggleTask(task.id))}
                            className="mt-1 h-4 w-4 rounded-full border-2 border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div className="flex-1">
                            <div
                              className={`text-base font-medium ${
                                task.completed
                                  ? "text-gray-400 line-through dark:text-gray-500"
                                  : "text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              {task.text}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                                {task.category}
                              </span>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  task.priority === "High"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : task.priority === "Low"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                }`}
                              >
                                {task.priority} Priority
                              </span>
                            </div>
                            {task.tags && task.tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {task.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {task.partners && task.partners.length > 0 && (
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                With: {task.partners.join(", ")}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 py-6 text-center text-gray-500 dark:text-gray-400">
                    No tasks scheduled for this day
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskDetailsModal.propTypes = {
  selectedDay: PropTypes.number,
  tasks: PropTypes.array,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Main Calendar component
const Calendar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const filterOptions = useSelector((state) => state.filters);

  // State for current month and year
  const [currentDate, setCurrentDate] = useState(new Date());

  // State for selected day and its tasks
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayTasks, setSelectedDayTasks] = useState(null);

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Handle day click
  const handleDayClick = (day, dayTasks) => {
    setSelectedDay(day);
    setSelectedDayTasks(dayTasks);
  };

  // Close modal
  const closeModal = () => {
    setSelectedDay(null);
    setSelectedDayTasks(null);
  };

  // Get month name and days in month
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  // Use filteredData function directly where needed
  const filteredTasks = useMemo(
    () => filteredData(tasks, filterOptions),
    [tasks, filterOptions],
  );

  // Calculate calendar data
  const calendarData = useMemo(() => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const daysInMonth = lastDayOfMonth.getDate();

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const days = Array(firstDayOfWeek).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentDate]);

  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const groupedTasks = {};

    filteredTasks.forEach((task) => {
      const taskDate = new Date(task.date);

      if (
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      ) {
        const day = taskDate.getDate();

        if (!groupedTasks[day]) {
          groupedTasks[day] = [];
        }

        groupedTasks[day].push(task);
      }
    });

    return groupedTasks;
  }, [filteredTasks, currentDate]);

  // Array of day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:mb-8 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold tracking-tight text-indigo-800 md:text-3xl dark:text-indigo-200">
            Calendar View
          </h2>

          <div className="flex items-center space-x-2 self-end md:space-x-4 md:self-auto">
            <button
              onClick={goToPreviousMonth}
              className="flex items-center rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-200 md:px-4 md:py-2 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
            >
              <IoChevronBackOutline className="mr-1 md:mr-2" />
              Prev
            </button>

            <span className="text-lg font-semibold text-gray-700 md:text-xl dark:text-gray-200">
              {monthName} {year}
            </span>

            <button
              onClick={goToNextMonth}
              className="flex items-center rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-200 md:px-4 md:py-2 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
            >
              Next
              <IoChevronForwardOutline className="ml-1 md:ml-2" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {/* Day names header */}
          <div className="grid grid-cols-7 divide-x divide-gray-200 bg-gray-50 dark:divide-gray-700 dark:bg-gray-800">
            {dayNames.map((day, index) => (
              <div
                key={index}
                className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 divide-x divide-y divide-gray-200 dark:divide-gray-700">
            {calendarData.map((day, index) => (
              <Fragment key={index}>
                <DayCell
                  day={day}
                  tasks={tasksByDate[day] || []}
                  currentDate={currentDate}
                  dispatch={dispatch}
                  onDayClick={handleDayClick}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Task details modal */}
      {selectedDay && (
        <TaskDetailsModal
          selectedDay={selectedDay}
          tasks={selectedDayTasks}
          currentDate={currentDate}
          onClose={closeModal}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Calendar;
