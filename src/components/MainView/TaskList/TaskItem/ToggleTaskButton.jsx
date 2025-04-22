import { useDispatch } from 'react-redux';
import { toggleTask } from '@/context/Slices/tasksSlice';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const ToggleTaskButton = ({ id, completed }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        dispatch(toggleTask(id));
      }}
      className={clsx(
        'mr-3 h-5 w-5 rounded-full border-2 border-indigo-500 transition-colors duration-200',
        completed && 'bg-indigo-500',
      )}
      aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
    ></button>
  );
};

ToggleTaskButton.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default ToggleTaskButton;
