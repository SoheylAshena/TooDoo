import { useState, useEffect } from "react";
import Profile from "./Profile";
import Navigation from "./Navigation";
import Category from "./Category";
import { HiMenuAlt2 } from "react-icons/hi";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setShowSidebar(false);
      } else {
        setIsMobile(false);
        setShowSidebar(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className={clsx(
            "fixed left-4 top-4 z-20 rounded-full bg-white p-2.5 shadow-lg hover:bg-gray-50",
            showSidebar && "none",
          )}
          aria-label="Toggle menu"
        >
          <HiMenuAlt2 className="text-2xl text-indigo-600" />
        </button>
      )}

      {/* Sidebar with overlay for mobile */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
        className={clsx(
          showSidebar ? "translate-x-0" : "-translate-x-full",
          "fixed z-40 flex h-full w-80 transform flex-col gap-4 overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out md:relative md:w-96 md:translate-x-0",
        )}
      >
        {/* Actual sidebar */}
        {isMobile && (
          <div className="mb-2 flex justify-end">
            <button
              onClick={handleClose}
              className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <IoMdClose className="text-2xl text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        )}
        <Profile />
        <Navigation onClose={handleClose} />
        <Category onClose={handleClose} />
      </div>
    </>
  );
};

export default SideBar;
