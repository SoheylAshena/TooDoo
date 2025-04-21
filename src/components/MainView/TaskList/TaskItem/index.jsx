import PropTypes from 'prop-types';
import { memo } from 'react';
import clsx from 'clsx';

import EditForm from '@/components/EditForm/EditForm';
import TaskText from './TaskText';
import PriorityIndicator from './PriorityIndicator';
import ShowMoreButton from './ShowMoreButton';
import ToggleTaskButton from './ToggleTaskButton';
import TaskDetails from './TaskDetails';

import useTaskItem from '@/hooks/useTaskItem';

const TaskItem = ({ task }) => {
  const { editing, setEditing, showDetails, toggleDetails } = useTaskItem();

  return (
    <>
      {editing && <EditForm task={task} setEditing={setEditing} />}

      <li
        className={clsx(
          'flex items-center rounded-xl p-4 transition-all duration-300 hover:translate-y-[-3px]',
          task.completed
            ? 'border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-800'
            : 'border border-gray-100 bg-white shadow-md hover:shadow-lg dark:border-gray-800 dark:bg-gray-900',
        )}
      >
        <ToggleTaskButton id={task.id} completed={task.completed} />
        <TaskText text={task.text} completed={task.completed} />
        <PriorityIndicator priority={task.priority} />
        <ShowMoreButton onClick={toggleDetails} showDetails={showDetails} />
        {showDetails && (
          <TaskDetails
            category={task.category}
            date={task.date}
            partners={task.partners}
            tags={task.tags}
            id={task.id}
            setEditing={setEditing}
          />
        )}
      </li>
    </>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.array,
    partners: PropTypes.array,
  }).isRequired,
};

export default memo(TaskItem);
