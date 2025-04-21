import { memo } from 'react';

const WeekDaysHeader = () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      {weekDays.map((day) => (
        <div key={day} className="p-2 text-center font-semibold text-gray-700 dark:text-gray-300">
          {day}
        </div>
      ))}
    </>
  );
};

export default memo(WeekDaysHeader);
