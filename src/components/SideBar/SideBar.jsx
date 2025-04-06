import { useEffect, useRef } from "react";
import Profile from "./Profile";
import Navigation from "./Navigation/Navigation";
import Category from "./Category";
import { HiMenuAlt2 } from "react-icons/hi";

const SideBar = () => {
  const sidebarRef = useRef(null);

  const toggleSidebar = (event) => {
    if (event) event.stopPropagation();
    const sidebar = sidebarRef.current;
    if (sidebar) {
      const isHidden = sidebar.classList.contains("-translate-x-full");
      if (isHidden) {
        sidebar.classList.remove("-translate-x-full");
      } else {
        sidebar.classList.add("-translate-x-full");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = sidebarRef.current;
      const isOpen =
        sidebar && !sidebar.classList.contains("-translate-x-full");

      if (isOpen && sidebar && !sidebar.contains(event.target)) {
        sidebar.classList.add("-translate-x-full");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 rounded-full bg-white p-2.5 shadow-lg md:hidden dark:bg-gray-900"
        aria-label="Toggle menu"
      >
        <HiMenuAlt2 className="text-2xl text-indigo-600 dark:text-indigo-400" />
      </button>

      <div
        ref={sidebarRef}
        className="custom-scrollbar fixed z-40 flex h-full w-80 -translate-x-full transform flex-col gap-4 overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out md:static md:min-w-[330px] md:translate-x-0 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <Profile />
        <Navigation onClose={() => toggleSidebar()} />
        <Category onClose={() => toggleSidebar()} />
      </div>
    </>
  );
};

export default SideBar;
