import { memo } from 'react';
import PropTypes from 'prop-types';

const DayCell = ({ day, tasks, onDayClick, currentDate }) => {
  if (!day) {
    return <div className="h-24 bg-white p-2 dark:bg-gray-800" />;
  }

  const isToday =
    new Date().getDate() === day &&
    new Date().getMonth() === currentDate.getMonth() &&
    new Date().getFullYear() === currentDate.getFullYear();

  return (
    <button
      onClick={() => onDayClick(day, tasks)}
      className={`relative h-24 w-full bg-white p-2 text-left transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 ${
        isToday ? 'bg-blue-50 dark:bg-blue-900/30' : ''
      }`}
    >
      <span
        className={`absolute top-1 left-1 text-sm font-medium ${
          isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {day}
      </span>
      {tasks.length > 0 && (
        <div className="mt-1 space-y-1 overflow-hidden">
          {tasks.slice(0, 2).map((task) => (
            <div key={task.id} className="truncate text-xs text-gray-600 dark:text-gray-400">
              • {task.text}
            </div>
          ))}
          {tasks.length > 2 && <div className="text-xs text-gray-500 dark:text-gray-400">+{tasks.length - 2} more</div>}
        </div>
      )}
    </button>
  );
};

DayCell.propTypes = {
  day: PropTypes.number,
  tasks: PropTypes.array,
  currentDate: PropTypes.instanceOf(Date),
  onDayClick: PropTypes.func.isRequired,
};

export default memo(DayCell);
