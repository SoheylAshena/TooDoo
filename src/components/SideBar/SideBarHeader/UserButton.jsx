import useProfileMenu from '@/hooks/useProfileMenu';
import { FiUser } from 'react-icons/fi';
import ProfileMenu from '@/components/SideBar/SideBarHeader/ProfileMenu';

const UserButton = () => {
  const { showProfileMenu, toggleMenu } = useProfileMenu();

  return (
    <>
      <button
        onClick={toggleMenu}
        className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label="User menu"
      >
        <FiUser size={20} />
      </button>
      {showProfileMenu && <ProfileMenu onToggleMenu={toggleMenu} />}
    </>
  );
};

export default UserButton;
