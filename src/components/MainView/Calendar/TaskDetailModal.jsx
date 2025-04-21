import { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const TaskDetailsModal = ({ selectedDay, tasks, currentDate, onClose }) => {
  const modalDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id="modal-title" className="text-lg font-medium text-gray-900 dark:text-white">
            Tasks for {modalDate}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-gray-300"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {tasks.length > 0 ? (
            <ul className="space-y-3" role="list">
              {tasks.map((task) => (
                <li key={task.id} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <div className="text-sm text-gray-800 dark:text-gray-200">{task.text}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-red-500'
                          : task.priority === 'Medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{task.priority} Priority</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No tasks scheduled for this day</p>
          )}
        </div>
      </div>
    </div>
  );
};

TaskDetailsModal.propTypes = {
  selectedDay: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(TaskDetailsModal);
