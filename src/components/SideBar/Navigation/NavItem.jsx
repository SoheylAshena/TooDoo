import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../context/Slices/filtersSlice";
import { getFilterConfig } from "../../../Utilities/filterUtils";
import { setCurrent } from "../../../context/Slices/CurrentSlice";
import useTaskCounts from "../../../hooks/useTaskCounts";

const NavItem = ({ icon, text, navItem, onClose }) => {
  const dispatch = useDispatch();
  const taskCounts = useTaskCounts();
  const config = getFilterConfig(navItem);
  const current = useSelector((state) => state.current);

  const handleItemClick = () => {
    // For direct navigation items, we can directly set the current without checking filters
    dispatch(setCurrent(navItem));

    // If we have a valid filter configuration, apply it
    if (config) {
      dispatch(setFilters(config));
    }

    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const count = taskCounts[navItem];

  return (
    <li
      onClick={handleItemClick}
      className={clsx(
        "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 font-medium transition-all duration-200",
        current === navItem
          ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400">{icon}</span>
        <span>{text}</span>
      </div>

      <span
        className={clsx(
          "rounded-full px-2 py-0.5 text-xs font-semibold",
          current === navItem
            ? "bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            : "bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-200",
        )}
      >
        {count}
      </span>
    </li>
  );
};

NavItem.displayName = "NavItem";

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  navItem: PropTypes.string,
  onClose: PropTypes.func,
};

export default NavItem;
