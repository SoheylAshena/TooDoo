import {
  MdDelete,
  MdEdit,
  MdOutlineLowPriority,
  MdOutlinePriorityHigh,
} from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import PropTypes from "prop-types";
import clsx from "clsx";
import { memo, useCallback } from "react";

// Move these helper functions outside the component to prevent recreation on every render
const getPriorityBadge = (priority) => {
  const lowerPriority = priority?.toLowerCase() || "medium";

  if (lowerPriority === "high") {
    return (
      <span className="flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
        <MdOutlinePriorityHigh className="mr-1" />
        High
      </span>
    );
  } else if (lowerPriority === "low") {
    return (
      <span className="flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
        <MdOutlineLowPriority className="mr-1" />
        Low
      </span>
    );
  } else {
    return (
      <span className="flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        <MdOutlinePriorityHigh className="mr-1" />
        Medium
      </span>
    );
  }
};

// Format date helper outside component
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TaskItem = memo(({ task, dispatch, toggleTask, deleteTasks }) => {
  // Memoized handlers
  const handleToggle = useCallback(() => {
    dispatch(toggleTask(task.id));
  }, [dispatch, toggleTask, task.id]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTasks(task.id));
  }, [dispatch, deleteTasks, task.id]);

  return (
    <li
      className={`rounded-xl ${
        task.completed
          ? "bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
          : "bg-white dark:border-gray-800 dark:bg-gray-900"
      } border border-gray-100 p-4 shadow-md transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg`}
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="h-4.5 w-4.5 rounded-full border-2 border-indigo-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-1"
          />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={clsx(
                "overflow-wrap-anywhere w-full text-base leading-normal font-medium break-words whitespace-normal",
                task.completed
                  ? "text-gray-400 line-through dark:text-gray-500"
                  : "text-gray-800 dark:text-gray-200",
              )}
            >
              {task.text}
            </h3>
            <div className="flex-shrink-0">
              {getPriorityBadge(task.priority)}
            </div>
          </div>

          <div className="mt-2">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                {task.category}
              </span>
              <span className="flex items-center rounded-md bg-gray-50 px-2 py-0.5 dark:bg-gray-800 dark:text-gray-400">
                <AiOutlineClockCircle className="mr-1" />
                {formatDate(task.date)}
              </span>
            </div>

            {(task.tags.length > 0 || task.partners) && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}

                {task.partners && task.partners.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.partners.map((partner) => (
                      <span
                        key={partner}
                        className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={handleDelete}
              className="rounded-md p-1 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
            >
              <MdDelete className="text-lg" />
            </button>
            <button className="rounded-md p-1 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-400">
              <MdEdit className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
});

TaskItem.displayName = "TaskItem";

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTasks: PropTypes.func.isRequired,
};

export default TaskItem;
