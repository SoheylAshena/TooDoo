import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  FaPlus,
  FaCalendarDay,
  FaCalendarAlt,
  FaFilter,
  FaCheckCircle,
  FaExclamationCircle,
  FaInbox,
  FaChartBar,
  FaRegCircle,
} from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { setFilters } from "../../context/Slices/filtersSlice";
import clsx from "clsx";
import { getFilterConfig } from "../../Utilities/filterUtils";

const NavigationSection = ({ title, children }) => (
  <div className="mb-4">
    {title && (
      <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
        {title}
      </h3>
    )}
    <ul className="space-y-1">{children}</ul>
  </div>
);

NavigationSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const NavItem = ({ icon, text, count, active, onClick, danger }) => (
  <li
    onClick={onClick}
    className={clsx(
      "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 font-medium transition-all duration-200",
      active
        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100",
      danger &&
        "text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-100",
    )}
  >
    <div className="flex items-center gap-3">
      <span
        className={clsx(
          active
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-500 dark:text-gray-400",
        )}
      >
        {icon}
      </span>
      <span>{text}</span>
    </div>
    {count !== undefined && (
      <span
        className={clsx(
          "rounded-full px-2 py-0.5 text-xs font-semibold",
          active
            ? "bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            : "bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-200",
        )}
      >
        {count}
      </span>
    )}
  </li>
);

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  danger: PropTypes.bool,
};

const Navigation = ({ onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const tasks = useSelector((state) => state.tasks);

  // Calculate task counts
  const taskCounts = {
    all: tasks.length,
    today: tasks.filter((task) => {
      const taskDate = new Date(task.date);
      const today = new Date();
      return taskDate.toDateString() === today.toDateString();
    }).length,
    upcoming: tasks.filter((task) => {
      const taskDate = new Date(task.date);
      const today = new Date();
      return (
        taskDate > today && taskDate.toDateString() !== today.toDateString()
      );
    }).length,
    completed: tasks.filter((task) => task.completed).length,
    high: tasks.filter((task) => task.priority?.toLowerCase() === "high")
      .length,
    active: tasks.filter((task) => !task.completed).length,
    recent: tasks.filter((task) => {
      const createdDate = new Date(task.createdAt || task.date);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return createdDate >= oneWeekAgo;
    }).length,
    calendar: tasks.length,
  };

  const handleItemClick = (item) => {
    if (item !== "add") {
      dispatch(setFilters(getFilterConfig(item)));
    }
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleAddTask = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const matchConfig = (item) => {
    const config = getFilterConfig(item);
    return (
      config.status === filters.status &&
      config.category === filters.category &&
      config.priority === filters.priority &&
      config.time === filters.time
    );
  };
  return (
    <div className="flex flex-col gap-2">
      {/* Search bar */}

      {/* Main menu items */}
      <NavigationSection>
        <NavItem
          icon={<FaInbox size={16} />}
          text="All Tasks"
          count={taskCounts.all}
          active={matchConfig("all")}
          onClick={() => handleItemClick("all")}
        />
        <NavItem
          icon={<FaPlus size={16} />}
          text="Add Task"
          active={false}
          onClick={handleAddTask}
        />
      </NavigationSection>

      {/* Tasks by time */}
      <NavigationSection title="Time Frame">
        <NavItem
          icon={<FaCalendarDay size={16} />}
          text="Today"
          count={taskCounts.today}
          active={matchConfig("today")}
          onClick={() => handleItemClick("today")}
        />
        <NavItem
          icon={<FaCalendarAlt size={16} />}
          text="Upcoming"
          count={taskCounts.upcoming}
          active={matchConfig("upcoming")}
          onClick={() => handleItemClick("upcoming")}
        />

        <NavItem
          icon={<BsClockHistory size={16} />}
          text="Recently Added"
          count={taskCounts.recent}
          active={matchConfig("recent")}
          onClick={() => handleItemClick("recent")}
        />
      </NavigationSection>

      {/* Tasks by status */}
      <NavigationSection title="Status">
        <NavItem
          icon={<FaCheckCircle size={16} />}
          text="Completed"
          count={taskCounts.completed}
          active={matchConfig("completed")}
          onClick={() => handleItemClick("completed")}
        />
        <NavItem
          icon={<FaExclamationCircle size={16} />}
          text="High Priority"
          count={taskCounts.high}
          active={matchConfig("high")}
          onClick={() => handleItemClick("high")}
        />
        <NavItem
          icon={<FaRegCircle size={16} />}
          text="Active"
          count={taskCounts.active}
          active={matchConfig("active")}
          onClick={() => handleItemClick("active")}
        />
      </NavigationSection>

      {/* Other */}
      <NavigationSection title="Other">
        <NavItem
          icon={<FaFilter size={16} />}
          text="Filters & Labels"
          active={false}
          onClick={() => handleItemClick("filters")}
        />
        <NavItem
          icon={<FaChartBar size={16} />}
          text="Analytics"
          active={false}
          onClick={() => handleItemClick("analytics")}
        />
        <NavItem
          icon={<IoMdSettings size={16} />}
          text="Settings"
          active={false}
          onClick={() => handleItemClick("settings")}
        />
      </NavigationSection>
    </div>
  );
};

Navigation.propTypes = {
  onClose: PropTypes.func,
};

export default Navigation;
