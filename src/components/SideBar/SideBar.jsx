import { useRef } from "react";
import Profile from "./Profile";
import Navigation from "./Navigation/Navigation";
import Category from "./Category";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";

const SideBar = () => {
  const sidebarRef = useRef(null);

  // Use useCallback to ensure the function is stable across renders.
  const toggleSidebar = () => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.classList.toggle("-translate-x-full");
    }
  };

  return (
    <>
      {/* Mobile button */}
      <button
        onClick={toggleSidebar}
        className={clsx(
          "fixed top-4 left-4 z-20 rounded-full bg-white p-2.5 shadow-lg hover:bg-gray-50 dark:bg-gray-900",
          "md:hidden", // Hidden on medium and larger screens
        )}
        aria-label="Toggle menu"
      >
        <HiMenuAlt2 className="text-2xl text-indigo-600 dark:text-indigo-400" />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="custom-scrollbar fixed z-40 flex h-full w-80 -translate-x-full transform flex-col gap-4 overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out md:relative md:w-96 md:translate-x-0 dark:bg-gray-900"
      >
        {/* Close button Mobile */}
        <div className="mb-2 flex justify-end md:hidden">
          <button
            onClick={toggleSidebar}
            className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <IoMdClose className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
          </button>
        </div>
        <Profile />
        <Navigation onClose={toggleSidebar} />
        <Category onClose={toggleSidebar} />
      </div>
    </>
  );
};

export default SideBar;
