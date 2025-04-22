import { HiMenuAlt2 } from 'react-icons/hi';
import PropTypes from 'prop-types';

const SideBarButton = ({ onclick }) => {
  return (
    <button onClick={onclick} className="fixed top-4 left-4 md:hidden" aria-label="Toggle menu">
      <HiMenuAlt2 className="text-3xl text-indigo-600 dark:text-indigo-400" />
    </button>
  );
};

SideBarButton.propTypes = {
  onclick: PropTypes.func.isRequired,
};

export default SideBarButton;
