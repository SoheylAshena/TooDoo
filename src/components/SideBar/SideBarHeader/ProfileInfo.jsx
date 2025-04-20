import { FiUser } from 'react-icons/fi';

const ProfileInfo = () => {
  return (
    <div className="flex items-center gap-3">
      <FiUser
        size={40}
        className="rounded-full border-2 border-indigo-500 object-cover text-indigo-500 shadow-md dark:border-indigo-400 dark:text-indigo-400"
      />
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          Soheyl Ashena
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Front-End Developer
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
