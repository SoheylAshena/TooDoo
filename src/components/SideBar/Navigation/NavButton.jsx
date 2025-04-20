import PropTypes from 'prop-types';
import clsx from 'clsx';

const NavButton = ({ icon, text, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100"
    >
      <div
        className={clsx(
          'flex items-center gap-3',
          text === 'Add Task'
            ? 'text-xl text-indigo-600 dark:text-indigo-400'
            : 'text-gray-500 dark:text-gray-400',
        )}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </div>
    </li>
  );
};

NavButton.displayName = 'NavButton';

NavButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavButton;
