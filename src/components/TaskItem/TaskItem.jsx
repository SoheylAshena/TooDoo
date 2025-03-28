import { MdDelete, MdEdit } from "react-icons/md";
import PropTypes from "prop-types";
import getPriorityBadge from "../../Utilities/getPeriorityBadge";
import TagsList from "./TagsList";
import TaskText from "./TaskText";
import CategoryLabel from "./CategoryLabel";
import DateLabel from "./DateLabel";
import PartnersList from "./PartnersList";
import { useDispatch } from "react-redux";
import { deleteTasks, toggleTask } from "../../context/Slices/tasksSlice";
import { memo } from "react";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  // Memoized handlers
  const handleDeleteTask = () => dispatch(deleteTasks(task.id));
  const handleToggleTask = () => dispatch(toggleTask(task.id));

  return (
    <li
      className={`rounded-xl border border-gray-100 p-4 shadow-md transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg ${
        task.completed
          ? "bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
          : "bg-white dark:border-gray-800 dark:bg-gray-900"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleTask}
            className="h-4.5 w-4.5 rounded-full border-2 border-indigo-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-1 dark:border-indigo-600 dark:focus:ring-indigo-400"
          />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <TaskText text={task.text} completed={task.completed} />
            <div className="flex-shrink-0">
              {getPriorityBadge(task.priority)}
            </div>
          </div>

          <div className="mt-2">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
              <CategoryLabel category={task.category} />
              <DateLabel date={task.date} />
            </div>

            {(task.tags?.length > 0 || task.partners?.length > 0) && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <TagsList tags={task.tags} />
                <PartnersList partners={task.partners} />
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={handleDeleteTask}
              className="rounded-md p-1 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
              aria-label="Delete task"
            >
              <MdDelete className="text-lg" />
            </button>
            <button
              className="rounded-md p-1 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
              aria-label="Edit task"
            >
              <MdEdit className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

TaskItem.displayName = "TaskItem";

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.array,
    partners: PropTypes.array,
  }).isRequired,
};

export default memo(TaskItem);
