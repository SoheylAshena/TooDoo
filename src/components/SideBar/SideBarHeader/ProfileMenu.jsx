import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';

const ProfileMenu = ({ onToggleMenu }) => {
  return (
    <div className="absolute top-10 right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
      <div className="border-b border-gray-100 px-4 py-2 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Signed in as
        </p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Soheyl Ashena
        </p>
      </div>
      <button
        onClick={onToggleMenu}
        className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        Your Profile
      </button>
      <button
        onClick={onToggleMenu}
        className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        Settings
      </button>
      <div className="border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={onToggleMenu}
          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-red-600 dark:text-red-400"
        >
          <FiLogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
};

ProfileMenu.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
};

export default ProfileMenu;
