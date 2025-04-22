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
    <section className="mt-3 w-full border-t border-gray-100 pt-3 dark:border-gray-800">
      <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
        <CategoryLabel category={category} />
        <DateLabel date={date} />
      </div>

      {(tags?.length > 0 || partners?.length > 0) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <TagsList tags={tags} />
          <PartnersList partners={partners} />
        </div>
      )}

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteTasks(id));
          }}
          className="rounded-md p-1 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
          aria-label="Delete task"
        >
          <MdDelete className="text-lg" />
        </button>
        <button
          onClick={() => setEditing(true)}
          className="rounded-md p-1 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
          aria-label="Edit task"
        >
          <MdEdit className="text-lg" />
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
