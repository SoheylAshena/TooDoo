import { HiMenuAlt2 } from "react-icons/hi";

const SideBarButton = ({ onclick }) => {
  return (
    <button
      onClick={onclick}
      className="fixed top-2 left-2 rounded-full border-b-2 border-indigo-200 bg-white p-2 md:hidden dark:bg-gray-900"
      aria-label="Toggle menu"
    >
      <HiMenuAlt2 className="text-2xl text-indigo-600 dark:text-indigo-400" />
    </button>
  );
};

export default SideBarButton;
