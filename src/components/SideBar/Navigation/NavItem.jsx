import PropTypes from "prop-types";
import clsx from "clsx";
import { memo } from "react";

const NavItem = memo(({ icon, text, count, active, onClick, danger }) => (
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
));

NavItem.displayName = "NavItem";

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  danger: PropTypes.bool,
};

export default NavItem;
