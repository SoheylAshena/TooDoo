import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import PropTypes from 'prop-types';

const ShowMoreButton = ({ onClick, showDetails }) => {
  return (
    <button
      onClick={onClick}
      className="ml-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={showDetails ? 'Hide details' : 'Show details'}
    >
      {showDetails ? <MdExpandLess className="text-gray-500" /> : <MdExpandMore className="text-gray-500" />}
    </button>
  );
};

ShowMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
};

export default ShowMoreButton;
