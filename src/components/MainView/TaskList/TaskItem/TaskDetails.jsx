import { MdDelete, MdEdit } from 'react-icons/md';
import CategoryLabel from './CategoryLabel';
import DateLabel from './DateLabel';
import PartnersList from './PartnersList';
import TagsList from './TagsList';
import { deleteTasks } from '@/context/Slices/tasksSlice';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const TaskDetails = ({ category, date, partners, tags, id, setEditing }) => {
  const dispatch = useDispatch();

  return (
    <section className="mt-3 flex w-full items-center justify-between">
      {/* Vertical accent bar */}

      <div>
        <div className="flex flex-wrap items-center gap-4 text-base font-semibold text-gray-700 dark:text-gray-200">
          <CategoryLabel category={category} />
          <span className="text-xs font-normal text-gray-400 dark:text-gray-500">•</span>
          <DateLabel date={date} />
        </div>

        {(tags?.length > 0 || partners?.length > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <TagsList tags={tags} />
            <PartnersList partners={partners} />
          </div>
        )}
      </div>
      {/* Floating action buttons */}
      <div className="top-4 right-4 flex flex-col items-end gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteTasks(id));
          }}
          className="group rounded-full bg-red-100/80 p-2 text-red-500 shadow transition-all hover:bg-red-200 hover:text-red-600 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/70 dark:hover:text-red-300"
          aria-label="Delete task"
        >
          <MdDelete className="text-xl transition-transform group-hover:scale-110" />
        </button>
        <button
          onClick={() => setEditing(true)}
          className="group rounded-full bg-indigo-100/80 p-2 text-indigo-500 shadow transition-all hover:bg-indigo-200 hover:text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-900/70 dark:hover:text-indigo-300"
          aria-label="Edit task"
        >
          <MdEdit className="text-xl transition-transform group-hover:scale-110" />
        </button>
      </div>
    </section>
  );
};

TaskDetails.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  partners: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  setEditing: PropTypes.func,
};

export default TaskDetails;
