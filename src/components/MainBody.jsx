import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteTasks, toggleTask } from "../context/Slices/tasksSlice";
import FilterPanel from "./FilterPanel";
import TaskList from "./TaskList";
import EmptyTasksMessage from "./EmptyTasksMessage";
import { BsFilter } from "react-icons/bs";
import { filteredData } from "../Utilities/filteredTasks";
const MainBody = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const filterOptions = useSelector((state) => state.filters);
  const [showFilters, setShowFilters] = useState(false);
  const filteredTasks = filteredData(tasks, filterOptions);

  console.log("Rendering MainBody");
  const categories = ["all", ...new Set(tasks.map((task) => task.category))];

  const timeCategories = [
    { value: "all", label: "All Categories" },
    ...categories
      .filter((cat) => cat !== "all")
      .map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-800 dark:text-indigo-200">
            Tasks Manager
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
          >
            <BsFilter className="mr-2 text-lg" />
            Filters & Sort
          </button>
        </div>

        {showFilters && (
          <FilterPanel
            filterOptions={filterOptions}
            timeCategories={timeCategories}
          />
        )}

        {filteredTasks.length === 0 ? (
          <EmptyTasksMessage filterOptions={filterOptions} />
        ) : (
          <TaskList
            filteredTasks={filteredTasks}
            dispatch={dispatch}
            toggleTask={toggleTask}
            deleteTasks={deleteTasks}
          />
        )}
      </div>
    </div>
  );
};

export default MainBody;
