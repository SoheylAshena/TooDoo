import { memo } from 'react';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';

import toggleTask from '@/context/Slices/tasksSlice';

const TaskDetailsModal = memo(({ selectedDay, tasks, currentDate, onClose, dispatch }) => {
  if (!selectedDay) return null;

  const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
  const formattedDate = dayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="h-full w-full transform overflow-hidden bg-white shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-5 sm:p-6 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tasks for {formattedDate}</h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-gray-300 dark:hover:text-white"
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-4 max-h-96 overflow-y-auto">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No tasks for this day</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`rounded-lg border p-3 ${
                      task.completed
                        ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                        : task.priority === 'High'
                          ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                          : task.priority === 'Low'
                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                            : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => dispatch(toggleTask(task.id))}
                        className="h-4 w-4 rounded-full border-2 border-indigo-300 text-indigo-600 focus:ring-indigo-500 dark:border-indigo-500 dark:focus:ring-indigo-400"
                      />
                      <div
                        className={`flex-1 ${
                          task.completed
                            ? 'text-gray-400 line-through dark:text-gray-500'
                            : 'text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        <div className="font-medium">{task.text}</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                            {task.category}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                              task.priority === 'High'
                                ? 'bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-300'
                                : task.priority === 'Low'
                                  ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

TaskDetailsModal.displayName = 'TaskDetailsModal';

TaskDetailsModal.propTypes = {
  selectedDay: PropTypes.number,
  tasks: PropTypes.array,
  currentDate: PropTypes.instanceOf(Date),
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TaskDetailsModal;
