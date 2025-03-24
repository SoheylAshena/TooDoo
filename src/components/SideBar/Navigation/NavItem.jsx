import PropTypes from "prop-types";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../../context/Slices/filtersSlice";
import { getFilterConfig } from "../../../Utilities/filterUtils";
import { currentView } from "../../../context/Slices/CurrentSlice";
import useTaskCounts from "../../../hooks/useTaskCounts";

const NavItem = ({ icon, text, navItem, onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const activeView = useSelector((state) => state.current);
  const taskCounts = useTaskCounts();

  const handleItemClick = () => {
    if (navItem && navItem !== "add") {
      try {
        // First set the current view, then apply filters
        dispatch(currentView(navItem));
        const config = getFilterConfig(navItem);
        if (config) {
          dispatch(setFilters(config));
        } else {
          console.error("Invalid filter configuration for:", navItem);
        }
      } catch (error) {
        console.error("Error changing navigation:", error);
      }
    }

    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const matchConfig = (item) => {
    if (!item) return false;
    const config = getFilterConfig(item);
    if (!config) return false;

    return (
      config.status === filters.status &&
      config.category === filters.category &&
      config.priority === filters.priority &&
      config.time === filters.time
    );
  };

  // Determine if this item is active
  const active = navItem
    ? activeView === navItem || matchConfig(navItem)
    : false;

  // Get the count for this specific nav item
  const count = navItem ? taskCounts[navItem] : undefined;

  return (
    <li
      onClick={handleItemClick}
      className={clsx(
        "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 font-medium transition-all duration-200",
        active
          ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100",
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
};

NavItem.displayName = "NavItem";

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  navItem: PropTypes.string,
  danger: PropTypes.bool,
  onClose: PropTypes.func,
};

export default NavItem;
