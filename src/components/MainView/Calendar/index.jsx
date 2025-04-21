import { memo } from 'react';

import CalendarHeader from './CalendarHeader';

import useCalendarState from '@/hooks/Calendar/useCalendarState';
import CalendarGrid from './CalendarGrid';

const Calendar = () => {
  const { currentDate, setCurrentDate } = useCalendarState();

  return (
    <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-900">
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarGrid currentDate={currentDate} />
    </div>
  );
};

export default memo(Calendar);
