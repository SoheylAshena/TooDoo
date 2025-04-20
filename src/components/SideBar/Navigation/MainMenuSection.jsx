import NavItem from '@/components/SideBar/Navigation/NavItem';
import NavButton from '@/components/SideBar/Navigation/NavButton';
import PropTypes from 'prop-types';
import { FaCalendarWeek, FaInbox, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleAddForm } from '@/context/Slices/addFormSlice';

const MainMenuSection = ({ onToggleSidebar, ICON_SIZE }) => {
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(toggleAddForm());
    onToggleSidebar();
  };

  return (
    <ul>
      <NavItem
        icon={<FaInbox size={ICON_SIZE} />}
        text="All Tasks"
        name="all"
        onToggleSidebar={onToggleSidebar}
      />
      <NavItem
        icon={<FaCalendarWeek size={ICON_SIZE} />}
        text="Calendar View"
        name="calendar"
        onToggleSidebar={onToggleSidebar}
      />
      <NavButton icon={<FaPlus size={ICON_SIZE} />} text="Add Task" onClick={handleAddTask} />
    </ul>
  );
};

MainMenuSection.propTypes = {
  onToggleSidebar: PropTypes.func,
  onAddTask: PropTypes.func,
  ICON_SIZE: PropTypes.number,
};

export default MainMenuSection;
