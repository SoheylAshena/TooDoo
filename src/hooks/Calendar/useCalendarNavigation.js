const useCalendarNavigation = (setCurrentDate) => {
  const goToPreviousMonth = () => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return {
    goToPreviousMonth,
    goToNextMonth,
  };
};

export default useCalendarNavigation;
