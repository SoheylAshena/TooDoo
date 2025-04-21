import { memo } from 'react';
import PropTypes from 'prop-types';
import useCalendarNavigation from '@/hooks/Calendar/useCalendarNavigation';

const CalendarHeader = ({ currentDate, setCurrentDate }) => {
  const { goToPreviousMonth, goToNextMonth } = useCalendarNavigation(setCurrentDate);

  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{monthYear}</h2>
      <div className="space-x-2">
        <button
          onClick={goToPreviousMonth}
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Previous month"
        >
          ←
        </button>
        <button
          onClick={goToNextMonth}
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Next month"
        >
          →
        </button>
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  setCurrentDate: PropTypes.func.isRequired,
};

export default memo(CalendarHeader);
