import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import useDarkMode from '@/hooks/useDarkMode';

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
    >
      {isDarkMode ? (
        <MdOutlineLightMode size={20} />
      ) : (
        <MdOutlineDarkMode size={20} />
      )}
    </button>
  );
};

export default DarkModeButton;
