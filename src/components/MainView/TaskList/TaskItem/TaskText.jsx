import PropTypes from 'prop-types';
import clsx from 'clsx';

const TaskText = ({ text, completed }) => (
  <h3
    className={clsx(
      'w-full font-medium break-words',
      completed
        ? 'text-gray-400 italic line-through opacity-80 dark:text-gray-500'
        : 'text-gray-800 dark:text-gray-200',
    )}
  >
    {text}
  </h3>
);

TaskText.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TaskText;
