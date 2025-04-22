import useDayCells from '@/hooks/Calendar/useDayCells';
import DayCell from './DayCell';
import WeekDaysHeader from './WeekDaysHeader';
import useCalendarSelection from '@/hooks/Calendar/useCalendarSelection';
import TaskDetailsModal from './TaskDetailModal';
import { useContext } from 'react';
import CurrentDateContext from '@/context/CurrentDateContext';

const CalendarGrid = () => {
  const { currentDate } = useContext(CurrentDateContext);
  const dayCells = useDayCells(currentDate);
  const { selectedDay, dayTasks, handleDayClick, closeModal } = useCalendarSelection();

  return (
    <>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
        <WeekDaysHeader />
        {dayCells.map((cell, index) => (
          <DayCell
            key={cell?.day || `empty-${index}`}
            day={cell?.day}
            tasks={cell?.tasks || []}
            currentDate={currentDate}
            onDayClick={handleDayClick}
          />
        ))}
      </div>

      {selectedDay && (
        <TaskDetailsModal selectedDay={selectedDay} tasks={dayTasks} currentDate={currentDate} onClose={closeModal} />
      )}
    </>
  );
};

export default CalendarGrid;
