import NavButton from '@/components/SideBar/Navigation/NavButton';
import PropTypes from 'prop-types';
import { FaChartBar, FaFilter } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const OtherSection = ({ onToggleSidebar, ICON_SIZE }) => (
  <>
    <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
      Other
    </h3>
    <ul>
      <NavButton
        icon={<FaFilter size={ICON_SIZE} />}
        text="Filters & Labels"
        onClick={() => {
          console.log('Filters & Labels');
          onToggleSidebar();
        }}
      />
      <NavButton
        icon={<FaChartBar size={ICON_SIZE} />}
        text="Analytics"
        onClick={() => {
          console.log('Analytics');
          onToggleSidebar();
        }}
      />
      <NavButton
        icon={<IoMdSettings size={ICON_SIZE} />}
        text="Settings"
        onClick={() => {
          console.log('Settings');
          onToggleSidebar();
        }}
      />
    </ul>
  </>
);

OtherSection.propTypes = {
  onToggleSidebar: PropTypes.func,
  ICON_SIZE: PropTypes.number,
};

export default OtherSection;
