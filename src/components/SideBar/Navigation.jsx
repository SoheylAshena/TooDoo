import { useState } from "react";
import AddTaskFrom from "./AddTaskForm";
import {
  FaPlus,
  FaSearch,
  FaCalendarDay,
  FaCalendarAlt,
  FaFilter,
} from "react-icons/fa";

const Navigation = () => {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 rounded-xl">
      <ul className="">
        <li
          onClick={() => setAddOpen(true)}
          className="flex cursor-pointer items-center gap-3 rounded-lg py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700"
        >
          <FaPlus className="text-blue-500" />
          Add task
        </li>
        <li className="flex cursor-pointer items-center gap-3 rounded-lg py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700">
          <FaSearch className="text-blue-500" />
          Search
        </li>
        <li className="flex cursor-pointer items-center gap-3 rounded-lg py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700">
          <FaCalendarDay className="text-blue-500" />
          Today
        </li>
        <li className="flex cursor-pointer items-center gap-3 rounded-lg py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700">
          <FaCalendarAlt className="text-blue-500" />
          Upcoming
        </li>
        <li className="flex cursor-pointer items-center gap-3 rounded-lg py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700">
          <FaFilter className="text-blue-500" />
          Filters & Labels
        </li>
      </ul>
      {addOpen && <AddTaskFrom onClose={() => setAddOpen(false)} />}
    </div>
  );
};

export default Navigation;
