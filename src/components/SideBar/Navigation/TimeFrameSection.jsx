import PropTypes from 'prop-types';
import { BsClockHistory } from 'react-icons/bs';
import { FaCalendarAlt, FaCalendarDay } from 'react-icons/fa';
import NavItem from '@/components/SideBar/Navigation/NavItem';

// Time frame section
const TimeFrameSection = ({ onToggleSidebar, ICON_SIZE }) => (
  <>
    <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
      Time Frame
    </h3>
    <ul>
      <NavItem
        icon={<FaCalendarDay size={ICON_SIZE} />}
        text="Today"
        name="today"
        onToggleSidebar={onToggleSidebar}
      />
      <NavItem
        icon={<FaCalendarAlt size={ICON_SIZE} />}
        text="Upcoming"
        name="upcoming"
        onToggleSidebar={onToggleSidebar}
      />
      <NavItem
        icon={<BsClockHistory size={ICON_SIZE} />}
        text="Recently Added"
        name="recent"
        onToggleSidebar={onToggleSidebar}
      />
    </ul>
  </>
);

TimeFrameSection.propTypes = {
  onToggleSidebar: PropTypes.func,
  ICON_SIZE: PropTypes.number,
};

export default TimeFrameSection;
