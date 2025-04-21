import { useState } from 'react';
const useTaskItem = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };
  return { showDetails, setEditing, toggleDetails, editing };
};

export default useTaskItem;
