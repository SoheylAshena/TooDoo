import {
  MdDelete,
  MdEdit,
  MdOutlineLowPriority,
  MdOutlinePriorityHigh,
} from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import PropTypes from "prop-types";

const TaskItem = ({ task, dispatch, toggleTask, deleteTasks }) => {
  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    const lowerPriority = priority?.toLowerCase() || "medium";

    if (lowerPriority === "high") {
      return (
        <span className="flex items-center rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
          <MdOutlinePriorityHigh className="mr-1" />
          High
        </span>
      );
    } else if (lowerPriority === "low") {
      return (
        <span className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
          <MdOutlineLowPriority className="mr-1" />
          Low
        </span>
      );
    } else {
      return (
        <span className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
          <MdOutlinePriorityHigh className="mr-1" />
          Medium
        </span>
      );
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <li
      className={`rounded-xl ${
        task.completed ? "bg-gray-50" : "bg-white"
      } p-4 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
          className="mt-1 h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-base font-medium ${
                task.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {task.text}
            </h3>
            {getPriorityBadge(task.priority)}
          </div>

          <div className="mt-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-medium text-indigo-500">
                {task.category}
              </span>
              <span className="flex items-center">
                <AiOutlineClockCircle className="mr-1" />
                {formatDate(task.date)}
              </span>
            </div>

            {(task.tags.length > 0 || task.partners) && (
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}

                {task.partners &&
                  task.partners.map((partner) => (
                    <span
                      key={partner}
                      className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600"
                    >
                      @{partner}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex">
          <button
            onClick={() => {
              /* Add edit functionality here */
            }}
            className="ml-2 rounded-full p-1.5 text-gray-400 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-500"
            aria-label="Edit task"
          >
            <MdEdit size={18} />
          </button>
          <button
            onClick={() => dispatch(deleteTasks(task.id))}
            className="ml-2 rounded-full p-1.5 text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
            aria-label="Delete task"
          >
            <MdDelete size={18} />
          </button>
        </div>
      </div>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    priority: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    partners: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTasks: PropTypes.func.isRequired,
};

export default TaskItem;
