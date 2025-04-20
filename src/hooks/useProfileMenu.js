import { useState } from 'react';

const useProfileMenu = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return {
    showProfileMenu,
    toggleMenu,
  };
};

export default useProfileMenu;
