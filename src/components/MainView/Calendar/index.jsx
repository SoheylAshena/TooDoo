import { memo } from 'react';

import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

import CurrentDateProvider from '@/context/CurrentDateProvider';

const Calendar = () => {
  return (
    <CurrentDateProvider>
      <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
        <CalendarHeader />
        <CalendarGrid />
      </div>
    </CurrentDateProvider>
  );
};

export default memo(Calendar);
