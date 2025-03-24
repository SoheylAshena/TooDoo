import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useCallback, memo } from "react";
import { deleteTasks, toggleTask } from "../context/Slices/tasksSlice";
import FilterPanel from "./FilterPanel";
import TaskList from "./TaskList";
import EmptyTasksMessage from "./EmptyTasksMessage";
import { BsFilter } from "react-icons/bs";
import { filteredData } from "../Utilities/filteredTasks";
import Calendar from "./Calendar";
import PropTypes from "prop-types";

// Extracted Header component to reduce rerenders
const Header = memo(({ title, onToggleFilters }) => (
  <div className="mb-8 flex items-center justify-between">
    <h2 className="text-3xl font-bold tracking-tight text-indigo-800 dark:text-indigo-200">
      {title}
    </h2>
    <button
      onClick={onToggleFilters}
      className="flex items-center rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
    >
      <BsFilter className="mr-2 text-lg" />
      Filters & Sort
    </button>
  </div>
));

Header.displayName = "Header";

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
};

const MainBody = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const currentView = useSelector((state) => state.current.currentView);
  const filterOptions = useSelector((state) => state.filters);
  const [showFilters, setShowFilters] = useState(false);

  // Memoize filtered tasks to prevent recalculation on every render
  const filteredTasks = useMemo(
    () => filteredData(tasks, filterOptions),
    [tasks, filterOptions],
  );

  // Memoize categories to prevent recreation on every render
  const categories = useMemo(
    () => ["all", ...new Set(tasks.map((task) => task.category))],
    [tasks],
  );

  const timeCategories = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...categories
        .filter((cat) => cat !== "all")
        .map((cat) => ({ value: cat, label: cat })),
    ],
    [categories],
  );

  // Callback for toggling filters visibility
  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  // Memoized action handlers
  const handleToggleTask = useCallback(
    (taskId) => dispatch(toggleTask(taskId)),
    [dispatch],
  );

  const handleDeleteTask = useCallback(
    (taskId) => dispatch(deleteTasks(taskId)),
    [dispatch],
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900">
      <div className="mx-auto max-w-4xl">
        {currentView !== "calendar" && (
          <Header title="Tasks Manager" onToggleFilters={toggleFilters} />
        )}

        {showFilters && (
          <FilterPanel
            filterOptions={filterOptions}
            timeCategories={timeCategories}
          />
        )}

        {currentView === "calendar" ? (
          <Calendar />
        ) : filteredTasks.length === 0 ? (
          <EmptyTasksMessage filterOptions={filterOptions} />
        ) : (
          <TaskList
            filteredTasks={filteredTasks}
            dispatch={dispatch}
            toggleTask={handleToggleTask}
            deleteTasks={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default memo(MainBody);
