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
  FaCalendarWeek,
} from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { setFilters } from "../../../context/Slices/filtersSlice";
import { getFilterConfig } from "../../../Utilities/filterUtils";
import { currentView } from "../../../context/Slices/CurrentSlice";
import NavigationSection from "./NavigationSection";
import NavItem from "./NavItem";
import useTaskCounts from "../../../hooks/useTaskCounts";

const Navigation = ({ onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const activeView = useSelector((state) => state.current.currentView);
  const taskCounts = useTaskCounts();

  const handleItemClick = (item) => {
    if (item !== "add") {
      dispatch(setFilters(getFilterConfig(item)));
      dispatch(currentView(item));
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

  const clickHandlers = {
    all: () => handleItemClick("all"),
    calendar: () => handleItemClick("calendar"),
    add: handleAddTask,
    today: () => handleItemClick("today"),
    upcoming: () => handleItemClick("upcoming"),
    recent: () => handleItemClick("recent"),
    completed: () => handleItemClick("completed"),
    high: () => handleItemClick("high"),
    active: () => handleItemClick("active"),
    filters: () => handleItemClick("filters"),
    analytics: () => handleItemClick("analytics"),
    settings: () => handleItemClick("settings"),
  };

  const activeStates = {
    all: activeView === "all" || matchConfig("all"),
    calendar: activeView === "calendar",
    today: activeView === "today" || matchConfig("today"),
    upcoming: activeView === "upcoming" || matchConfig("upcoming"),
    recent: activeView === "recent" || matchConfig("recent"),
    completed: activeView === "completed" || matchConfig("completed"),
    high: activeView === "high" || matchConfig("high"),
    active: activeView === "active" || matchConfig("active"),
  };

  console.log("rendered");

  return (
    <div className="flex flex-col gap-2">
      {/* Search bar */}

      {/* Main menu items */}
      <NavigationSection>
        <NavItem
          icon={<FaInbox size={16} />}
          text="All Tasks"
          count={taskCounts.all}
          active={activeStates.all}
          onClick={clickHandlers.all}
        />
        <NavItem
          icon={<FaCalendarWeek size={16} />}
          text="Calendar View"
          count={taskCounts.calendar}
          active={activeStates.calendar}
          onClick={clickHandlers.calendar}
        />
        <NavItem
          icon={<FaPlus size={16} />}
          text="Add Task"
          active={false}
          onClick={clickHandlers.add}
        />
      </NavigationSection>

      {/* Tasks by time */}
      <NavigationSection title="Time Frame">
        <NavItem
          icon={<FaCalendarDay size={16} />}
          text="Today"
          count={taskCounts.today}
          active={activeStates.today}
          onClick={clickHandlers.today}
        />
        <NavItem
          icon={<FaCalendarAlt size={16} />}
          text="Upcoming"
          count={taskCounts.upcoming}
          active={activeStates.upcoming}
          onClick={clickHandlers.upcoming}
        />

        <NavItem
          icon={<BsClockHistory size={16} />}
          text="Recently Added"
          count={taskCounts.recent}
          active={activeStates.recent}
          onClick={clickHandlers.recent}
        />
      </NavigationSection>

      {/* Tasks by status */}
      <NavigationSection title="Status">
        <NavItem
          icon={<FaCheckCircle size={16} />}
          text="Completed"
          count={taskCounts.completed}
          active={activeStates.completed}
          onClick={clickHandlers.completed}
        />
        <NavItem
          icon={<FaExclamationCircle size={16} />}
          text="High Priority"
          count={taskCounts.high}
          active={activeStates.high}
          onClick={clickHandlers.high}
        />
        <NavItem
          icon={<FaRegCircle size={16} />}
          text="Active"
          count={taskCounts.active}
          active={activeStates.active}
          onClick={clickHandlers.active}
        />
      </NavigationSection>

      {/* Other */}
      <NavigationSection title="Other">
        <NavItem
          icon={<FaFilter size={16} />}
          text="Filters & Labels"
          active={false}
          onClick={clickHandlers.filters}
        />
        <NavItem
          icon={<FaChartBar size={16} />}
          text="Analytics"
          active={false}
          onClick={clickHandlers.analytics}
        />
        <NavItem
          icon={<IoMdSettings size={16} />}
          text="Settings"
          active={false}
          onClick={clickHandlers.settings}
        />
      </NavigationSection>
    </div>
  );
};

Navigation.propTypes = {
  onClose: PropTypes.func,
};

export default Navigation;
