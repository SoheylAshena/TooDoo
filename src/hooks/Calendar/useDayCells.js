import { getDaysInMonth, getFirstDayOfMonth, groupTasksByDay, generateCalendarCells } from '@/hooks/Calendar/utils';
import { useSelector } from 'react-redux';

const useDayCells = (currentDate) => {
  const tasks = useSelector((state) => state.tasks);
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const tasksByDay = groupTasksByDay(tasks, currentDate);

  return generateCalendarCells(daysInMonth, firstDayOfMonth, tasksByDay);
};

export default useDayCells;
