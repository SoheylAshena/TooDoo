import ProfileInfo from '@/components/SideBar/SideBarHeader/ProfileInfo';
import DarkModeButton from '@/components/SideBar/SideBarHeader/DarkModeButton';
import NotificationButton from '@/components/SideBar/SideBarHeader/NotificationButton';
import UserButton from '@/components/SideBar/SideBarHeader/UserButton';

const SideBarHeader = () => {
  return (
    <div className="relative flex items-center justify-between">
      <ProfileInfo />
      <DarkModeButton />
      <NotificationButton />
      <UserButton />
    </div>
  );
};

export default SideBarHeader;
