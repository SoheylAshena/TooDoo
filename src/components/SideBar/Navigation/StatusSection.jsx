import NavItem from '@/components/SideBar/Navigation/NavItem';
import { FaCheckCircle, FaExclamationCircle, FaRegCircle } from 'react-icons/fa';
import propTypes from 'prop-types';

const StatusSection = ({ onToggleSidebar, ICON_SIZE }) => (
  <>
    <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
      Status
    </h3>
    <ul title="Status">
      <NavItem
        icon={<FaCheckCircle size={ICON_SIZE} />}
        text="Completed"
        name="completed"
        onToggleSidebar={onToggleSidebar}
      />
      <NavItem
        icon={<FaExclamationCircle size={ICON_SIZE} />}
        text="High Priority"
        name="high"
        onToggleSidebar={onToggleSidebar}
      />
      <NavItem
        icon={<FaRegCircle size={ICON_SIZE} />}
        text="Active"
        name="active"
        onToggleSidebar={onToggleSidebar}
      />
    </ul>
  </>
);

StatusSection.propTypes = {
  onToggleSidebar: propTypes.func,
  ICON_SIZE: propTypes.number,
};

export default StatusSection;
