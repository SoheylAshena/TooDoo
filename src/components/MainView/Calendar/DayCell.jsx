import PropTypes from 'prop-types';
import { memo } from 'react';

// Day Cell component to prevent re-renders of the entire calendar
const DayCell = memo(({ day, tasks, currentDate, onDayClick }) => {
  if (day === null) {
    return <div className="min-h-[120px] bg-gray-50 p-2 opacity-50 dark:bg-gray-800" />;
  }

  const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const isToday = new Date().toDateString() === dayDate.toDateString();

  return (
    <div
      onClick={() => onDayClick(day, tasks)}
      className={`min-h-[120px] cursor-pointer p-2 transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 ${
        isToday ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className={`mb-2 flex justify-end ${isToday ? 'font-bold' : 'font-medium'}`}>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            isToday ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {day}
        </span>
      </div>

      {/* Tasks preview - only show up to 3 */}
      <div className="scrollbar-none max-h-[80px] space-y-1.5 overflow-hidden">
        {tasks && tasks.length > 0 && (
          <div className="text-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {tasks.length} Tasks
          </div>
        )}
      </div>
    </div>
  );
});

DayCell.displayName = 'DayCell';

DayCell.propTypes = {
  day: PropTypes.number,
  tasks: PropTypes.array,
  currentDate: PropTypes.instanceOf(Date),
  dispatch: PropTypes.func.isRequired,
  onDayClick: PropTypes.func.isRequired,
};

export default DayCell;
