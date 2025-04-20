import PropTypes from 'prop-types';

const NavItemInfo = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-500 dark:text-gray-400">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default NavItemInfo;

NavItemInfo.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};
