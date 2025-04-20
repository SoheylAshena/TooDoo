import { IoMdNotificationsOutline } from 'react-icons/io';

const NotificationButton = () => {
  return (
    <button
      className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      aria-label="Notifications"
    >
      <IoMdNotificationsOutline size={20} />
    </button>
  );
};

export default NotificationButton;
