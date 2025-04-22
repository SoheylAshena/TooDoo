import { memo, useContext } from 'react';
import useCalendarNavigation from '@/hooks/Calendar/useCalendarNavigation';
import CurrentDateContext from '@/context/CurrentDateContext';

const CalendarHeader = () => {
  const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
  const { goToPreviousMonth, goToNextMonth } = useCalendarNavigation(setCurrentDate);

  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{monthYear}</h2>
      <div className="flex gap-1">
        <button
          onClick={goToPreviousMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Previous month"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNextMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Next month"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default memo(CalendarHeader);
