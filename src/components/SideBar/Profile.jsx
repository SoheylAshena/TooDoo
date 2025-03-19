import { useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FiLogOut, FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiUser
              size={40}
              className="rounded-full border-2 border-indigo-500 object-cover text-indigo-500 shadow-md"
            />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              Soheyl Ashena
            </h2>
            <p className="text-xs text-gray-500">Front-End Developer</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            {isDarkMode ? (
              <MdOutlineLightMode size={20} />
            ) : (
              <MdOutlineDarkMode size={20} />
            )}
          </button>

          <button
            className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <IoMdNotificationsOutline size={20} />
          </button>

          <button
            onClick={toggleMenu}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="User menu"
          >
            <FiUser size={20} />
          </button>
        </div>
      </div>

      {/* User menu dropdown */}
      {showMenu && (
        <div className="absolute top-10 right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-gray-200">
          <div className="border-b border-gray-100 px-4 py-2">
            <p className="text-xs font-medium text-gray-500">Signed in as</p>
            <p className="text-sm font-semibold text-gray-800">Soheyl Ashena</p>
          </div>
          <button
            onClick={toggleMenu}
            className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Your Profile
          </button>
          <button
            onClick={toggleMenu}
            className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Settings
          </button>
          <div className="border-t border-gray-100">
            <button
              onClick={toggleMenu}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <FiLogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* App name & version */}
      <div className="mt-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-indigo-700">TooDoo</h1>
        </div>
        <div className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
          Pro
        </div>
      </div>
    </div>
  );
};

export default Profile;
