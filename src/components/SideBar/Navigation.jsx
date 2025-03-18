import { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { useModal } from "../../context/ModalContext";
import { setFilters } from "../../context/Slices/filtersSlice";
import clsx from "clsx";

const NavigationSection = ({ title, children }) => (
  <div className="mb-4">
    {title && (
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
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
        ? "bg-indigo-100 text-indigo-800"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      danger && "text-red-600 hover:bg-red-50 hover:text-red-700",
    )}
  >
    <div className="flex items-center gap-3">
      <span className={clsx(active ? "text-indigo-600" : "text-gray-500")}>
        {icon}
      </span>
      <span>{text}</span>
    </div>
    {count !== undefined && (
      <span
        className={clsx(
          "rounded-full px-2 py-0.5 text-xs font-semibold",
          active
            ? "bg-indigo-200 text-indigo-800"
            : "bg-gray-200 text-gray-700",
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
  const [activeItem, setActiveItem] = useState("all");
  const { openAddTaskModal } = useModal();
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
    recent: tasks.filter((task) => {
      const createdDate = new Date(task.createdAt || task.date);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return createdDate >= oneWeekAgo;
    }).length,
  };

  // Define filter configurations for each navigation item
  const getFilterConfig = (item) => {
    switch (item) {
      case "all":
        return {
          category: "all",
          status: "all",
          search: "",
          priority: "all",
          time: "all",
          tags: [],
          partners: [],
        };
      case "completed":
        return {
          category: "all",
          status: "completed",
          search: "",
          priority: "all",
          time: "all",
          tags: [],
          partners: [],
        };
      case "high":
        return {
          category: "all",
          status: "all",
          search: "",
          priority: "high",
          time: "all",
          tags: [],
          partners: [],
        };
      case "today":
        return {
          category: "all",
          status: "all",
          search: "",
          priority: "all",
          time: "today",
          tags: [],
          partners: [],
        };
      case "upcoming":
        return {
          category: "all",
          status: "all",
          search: "",
          priority: "all",
          time: "upcoming",
          tags: [],
          partners: [],
        };
      case "recent":
        return {
          category: "all",
          status: "all",
          search: "",
          priority: "all",
          time: "recent",
          tags: [],
          partners: [],
        };
      case "filters":
        return filters; // Keep current filters when visiting filters page
      case "analytics":
        return filters; // Keep current filters when visiting analytics
      case "settings":
        return filters; // Keep current filters when visiting settings
      default:
        return {
          category: "all",
          status: "all",
          search: "",
          priority: "all",
          time: "all",
          tags: [],
          partners: [],
        };
    }
  };

  const matchesConfig = (configName) => {
    const config = getFilterConfig(configName);
    if (["filters", "analytics", "settings"].includes(configName)) {
      return activeItem === configName;
    }

    return (
      filters.category === config.category &&
      filters.status === config.status &&
      filters.priority === config.priority &&
      filters.time === config.time &&
      filters.tags === config.tags &&
      filters.partners === config.partners &&
      (!filters.search || configName === activeItem)
    );
  };

  useEffect(() => {
    if (matchesConfig("completed")) {
      setActiveItem("completed");
    } else if (matchesConfig("high")) {
      setActiveItem("high");
    } else if (matchesConfig("all")) {
      setActiveItem("all");
    } else if (matchesConfig("today")) {
      setActiveItem("today");
    } else if (matchesConfig("upcoming")) {
      setActiveItem("upcoming");
    } else if (matchesConfig("recent")) {
      setActiveItem("recent");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleItemClick = (item) => {
    // Update filters based on the navigation item
    if (item !== "add") {
      dispatch(setFilters(getFilterConfig(item)));
    }

    setActiveItem(item);

    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleAddTask = () => {
    openAddTaskModal();
    if (window.innerWidth < 768) {
      onClose();
    }
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
          active={activeItem === "all"}
          onClick={() => handleItemClick("all")}
        />
        <NavItem
          icon={<FaPlus size={16} />}
          text="Add Task"
          active={activeItem === "add"}
          onClick={handleAddTask}
        />
      </NavigationSection>

      {/* Tasks by time */}
      <NavigationSection title="Time Frame">
        <NavItem
          icon={<FaCalendarDay size={16} />}
          text="Today"
          count={taskCounts.today}
          active={activeItem === "today"}
          onClick={() => handleItemClick("today")}
        />
        <NavItem
          icon={<FaCalendarAlt size={16} />}
          text="Upcoming"
          count={taskCounts.upcoming}
          active={activeItem === "upcoming"}
          onClick={() => handleItemClick("upcoming")}
        />
        <NavItem
          icon={<BsClockHistory size={16} />}
          text="Recently Added"
          count={taskCounts.recent}
          active={activeItem === "recent"}
          onClick={() => handleItemClick("recent")}
        />
      </NavigationSection>

      {/* Tasks by status */}
      <NavigationSection title="Status">
        <NavItem
          icon={<FaCheckCircle size={16} />}
          text="Completed"
          count={taskCounts.completed}
          active={activeItem === "completed"}
          onClick={() => handleItemClick("completed")}
        />
        <NavItem
          icon={<FaExclamationCircle size={16} />}
          text="High Priority"
          count={taskCounts.high}
          active={activeItem === "high"}
          onClick={() => handleItemClick("high")}
        />
      </NavigationSection>

      {/* Other */}
      <NavigationSection title="Other">
        <NavItem
          icon={<FaFilter size={16} />}
          text="Filters & Labels"
          active={activeItem === "filters"}
          onClick={() => handleItemClick("filters")}
        />
        <NavItem
          icon={<FaChartBar size={16} />}
          text="Analytics"
          active={activeItem === "analytics"}
          onClick={() => handleItemClick("analytics")}
        />
        <NavItem
          icon={<IoMdSettings size={16} />}
          text="Settings"
          active={activeItem === "settings"}
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
