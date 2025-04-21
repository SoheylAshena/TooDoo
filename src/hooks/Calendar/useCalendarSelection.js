import { useState } from 'react';

const useCalendarSelection = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayTasks, setDayTasks] = useState([]);

  const handleDayClick = (day, tasks) => {
    setSelectedDay(day);
    setDayTasks(tasks || []);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setDayTasks([]);
  };

  return {
    selectedDay,
    dayTasks,
    handleDayClick,
    closeModal,
  };
};

export default useCalendarSelection;
