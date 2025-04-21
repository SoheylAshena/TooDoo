import { memo } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

// Calendar header component to reduce rerenders
const CalendarHeader = memo(({ currentDate, onPrevMonth, onNextMonth }) => {
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mb-4 flex items-center justify-between rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900">
      <button
        onClick={onPrevMonth}
        className="rounded-full p-1.5 text-indigo-800 hover:bg-indigo-100 dark:text-indigo-200 dark:hover:bg-indigo-800"
      >
        <IoChevronBackOutline className="h-6 w-6" />
      </button>
      <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-200">{formattedDate}</h3>
      <button
        onClick={onNextMonth}
        className="rounded-full p-1.5 text-indigo-800 hover:bg-indigo-100 dark:text-indigo-200 dark:hover:bg-indigo-800"
      >
        <IoChevronForwardOutline className="h-6 w-6" />
      </button>
    </div>
  );
});

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
};

export default CalendarHeader;
