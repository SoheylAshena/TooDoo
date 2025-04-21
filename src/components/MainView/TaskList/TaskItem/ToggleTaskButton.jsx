import { useDispatch } from 'react-redux';
import { toggleTask } from '@/context/Slices/tasksSlice';
import PropTypes from 'prop-types';

const ToggleTaskButton = ({ id, completed }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        dispatch(toggleTask(id));
      }}
      className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
        completed
          ? 'border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400'
          : 'border-indigo-300 dark:border-indigo-600'
      } transition-colors duration-200 hover:border-indigo-500 dark:hover:border-indigo-400`}
      aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
    >
      {completed && <span className="h-2 w-2 rounded-full bg-white dark:bg-gray-900"></span>}
    </button>
  );
};

ToggleTaskButton.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default ToggleTaskButton;
