import PropTypes from 'prop-types';

// Components imports
import MainMenuSection from '@/components/SideBar/Navigation/MainMenuSection';
import TimeFrameSection from '@/components/SideBar/Navigation/TimeFrameSection';
import StatusSection from '@/components/SideBar/Navigation/StatusSection';
import OtherSection from '@/components/SideBar/Navigation/OtherSection';

const ICON_SIZE = 16;

const Navigation = ({ onToggleSidebar }) => {
  return (
    <>
      <MainMenuSection onToggleSidebar={onToggleSidebar} ICON_SIZE={ICON_SIZE} />
      <TimeFrameSection onToggleSidebar={onToggleSidebar} ICON_SIZE={ICON_SIZE} />
      <StatusSection onToggleSidebar={onToggleSidebar} ICON_SIZE={ICON_SIZE} />
      <OtherSection onToggleSidebar={onToggleSidebar} ICON_SIZE={ICON_SIZE} />
    </>
  );
};

Navigation.propTypes = {
  onToggleSidebar: PropTypes.func,
};

export default Navigation;
