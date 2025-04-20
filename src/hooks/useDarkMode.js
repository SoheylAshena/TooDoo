import { useLayoutEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('dark') === 'true',
  );

  // Synchronously apply dark mode before paint
  useLayoutEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle dark mode: update state and localStorage.
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('dark', newMode);
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
