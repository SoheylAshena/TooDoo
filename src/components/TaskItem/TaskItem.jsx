import { MdDelete, MdEdit, MdExpandMore, MdExpandLess } from "react-icons/md";
import PropTypes from "prop-types";
import TagsList from "./TagsList";
import TaskText from "./TaskText";
import CategoryLabel from "./CategoryLabel";
import DateLabel from "./DateLabel";
import PartnersList from "./PartnersList";
import { useDispatch } from "react-redux";
import { deleteTasks, toggleTask } from "../../context/Slices/tasksSlice";
import { memo, useState } from "react";
import EditForm from "../EditForm";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <>
      {editing && <EditForm task={task} setEditing={setEditing} />}
      <li
        className={`rounded-xl p-4 transition-all duration-300 hover:translate-y-[-3px] ${
          task.completed
            ? "border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            : "border border-gray-100 bg-white shadow-md hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleTask(task.id));
                }}
                className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  task.completed
                    ? "border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400"
                    : "border-indigo-300 dark:border-indigo-600"
                } transition-colors duration-200 hover:border-indigo-500 dark:hover:border-indigo-400`}
                aria-label={
                  task.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {task.completed && (
                  <span className="h-2 w-2 rounded-full bg-white dark:bg-gray-900"></span>
                )}
              </button>
              <div className="flex flex-1 items-center gap-2">
                <TaskText text={task.text} completed={task.completed} />
                <div
                  className="ml-2 h-2 w-2 flex-shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      task.priority === "High"
                        ? "#ef4444"
                        : task.priority === "Medium"
                          ? "#f59e0b"
                          : "#10b981",
                  }}
                ></div>
              </div>
              <button
                onClick={toggleDetails}
                className="ml-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={showDetails ? "Hide details" : "Show details"}
              >
                {showDetails ? (
                  <MdExpandLess className="text-gray-500" />
                ) : (
                  <MdExpandMore className="text-gray-500" />
                )}
              </button>
            </div>

            {showDetails && (
              <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
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

                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteTasks(task.id));
                    }}
                    className="rounded-md p-1 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
                    aria-label="Delete task"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                  <button
                    onClick={() => setEditing(true)}
                    className="rounded-md p-1 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                    aria-label="Edit task"
                  >
                    <MdEdit className="text-lg" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
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
