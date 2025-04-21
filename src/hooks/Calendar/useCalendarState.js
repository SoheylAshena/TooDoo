import { useState } from 'react';

const useCalendarState = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return {
    currentDate,
    setCurrentDate,
  };
};

export default useCalendarState;
