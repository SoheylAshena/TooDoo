import PropTypes from "prop-types";
import clsx from "clsx";

const TaskText = ({ text, completed }) => (
  <h3
    className={clsx(
      "overflow-wrap-anywhere w-full text-base leading-normal font-medium break-words whitespace-normal",
      completed
        ? "text-gray-400 italic line-through opacity-80 dark:text-gray-500"
        : "text-gray-800 dark:text-gray-200",
    )}
  >
    {text}
  </h3>
);

TaskText.displayName = "TaskText";

TaskText.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TaskText;
