import { useState } from 'react';

const useFilterMenu = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  return { showFilters, toggleFilters };
};

export default useFilterMenu;
