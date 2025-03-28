import { useState } from "react";
import { useSelector } from "react-redux";
import { BsFilter } from "react-icons/bs";
import FilterPanel from "./FilterPanel";

const Header = () => {
  const [showFilters, setShowFilters] = useState(false);
  const currentView = useSelector((state) => state.current);
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  return (
    <>
      {currentView !== "calendar" && (
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-800 dark:text-indigo-200">
            Tasks Manager
          </h2>
          <button
            onClick={toggleFilters}
            className="flex items-center rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
          >
            <BsFilter className="mr-2 text-lg" />
            Filters & Sort
          </button>
        </div>
      )}
      {showFilters && <FilterPanel />}
    </>
  );
};

export default Header;
