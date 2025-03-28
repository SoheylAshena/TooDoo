import { useDispatch } from "react-redux";
import { BsArrowDown, BsArrowUp, BsSearch } from "react-icons/bs";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { setFilters } from "../context/Slices/filtersSlice";
import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { checkAndSyncCurrent } from "../context/Slices/CurrentSlice";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const [statusOpen, setStatusOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const filterOptions = useSelector((state) => state.filters);
  const tasks = useSelector((state) => state.tasks);

  // Helper to update filters and sync current
  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(checkAndSyncCurrent());
  };

  const categories = ["all", ...new Set(tasks.map((task) => task.category))];

  // Status options
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  // Priority options
  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  return (
    <div className="mb-6 rounded-lg bg-white shadow-sm dark:bg-gray-900">
      <div className="space-y-4 p-4">
        {/* Search input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
            <BsSearch />
          </div>
          <input
            type="text"
            value={filterOptions.search}
            onChange={(e) =>
              updateFilters({ ...filterOptions, search: e.target.value })
            }
            placeholder="Search tasks..."
            className="w-full rounded-lg border-none bg-gray-50 py-2 pr-3 pl-10 text-sm transition-colors focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:focus:bg-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Status filter - Custom dropdown */}
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Status
            </label>
            <div
              className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={() => setStatusOpen(!statusOpen)}
            >
              <span className="text-gray-700 dark:text-gray-300">
                {statusOptions.find(
                  (option) => option.value === filterOptions.status,
                )?.label || "All"}
              </span>
              <svg
                className={`h-4 w-4 text-gray-500 transition-transform ${statusOpen ? "rotate-180" : ""} dark:text-gray-400`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {statusOpen && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className={clsx(
                      "cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                      filterOptions.status === option.value &&
                        "bg-indigo-50 text-indigo-700 dark:bg-gray-800 dark:text-indigo-500",
                    )}
                    onClick={() => {
                      updateFilters({ ...filterOptions, status: option.value });
                      setStatusOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category filter - Custom dropdown */}
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Category
            </label>
            <div
              className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <span className="text-gray-700 dark:text-gray-300">
                {filterOptions.category === "all"
                  ? "All Categories"
                  : filterOptions.category}
              </span>
              <svg
                className={`h-4 w-4 text-gray-500 transition-transform ${categoryOpen ? "rotate-180" : ""} dark:text-gray-400`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {categoryOpen && (
              <div className="absolute z-10 mt-1 max-h-48 w-full overflow-hidden overflow-y-auto rounded-lg border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                {categories.map((category) => (
                  <div
                    key={category}
                    className={clsx(
                      "cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                      filterOptions.category === category &&
                        "bg-indigo-50 text-indigo-700 dark:bg-gray-800 dark:text-indigo-500",
                    )}
                    onClick={() => {
                      updateFilters({
                        ...filterOptions,
                        category: category,
                      });
                      setCategoryOpen(false);
                    }}
                  >
                    {category === "all" ? "All Categories" : category}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority filter - Custom dropdown */}
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Priority
            </label>
            <div
              className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={() => setPriorityOpen(!priorityOpen)}
            >
              <span className="text-gray-700 dark:text-gray-300">
                {priorityOptions.find(
                  (option) => option.value === filterOptions.priority,
                )?.label || "All Priorities"}
              </span>
              <svg
                className={`h-4 w-4 text-gray-500 transition-transform ${priorityOpen ? "rotate-180" : ""} dark:text-gray-400`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {priorityOpen && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
                {priorityOptions.map((option) => (
                  <div
                    key={option.value}
                    className={clsx(
                      "cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800",
                      filterOptions.priority === option.value &&
                        "bg-indigo-50 text-indigo-700 dark:bg-gray-800 dark:text-indigo-500",
                    )}
                    onClick={() => {
                      updateFilters({
                        ...filterOptions,
                        priority: option.value,
                      });
                      setPriorityOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sorting options - redesigned as segmented control */}
        <div className="mt-2">
          <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Sort by
          </label>
          <div className="inline-flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() =>
                updateFilters({ ...filterOptions, sort: "date-desc" })
              }
              className={clsx(
                "flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                filterOptions.sort === "date-desc"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-indigo-400"
                  : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300",
              )}
            >
              <BsArrowDown className="mr-1.5" />
              Newest
            </button>
            <button
              onClick={() =>
                updateFilters({ ...filterOptions, sort: "date-asc" })
              }
              className={clsx(
                "flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                filterOptions.sort === "date-asc"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-indigo-400"
                  : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300",
              )}
            >
              <BsArrowUp className="mr-1.5" />
              Oldest
            </button>
            <button
              onClick={() =>
                updateFilters({ ...filterOptions, sort: "priority" })
              }
              className={clsx(
                "flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                filterOptions.sort === "priority"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-indigo-400"
                  : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300",
              )}
            >
              <MdOutlinePriorityHigh className="mr-1.5" />
              Priority
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
