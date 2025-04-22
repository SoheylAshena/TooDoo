import PropTypes from 'prop-types';

const PriorityIndicator = ({ priority }) => {
  return (
    <div
      className="ml-2 h-2 w-2 rounded-full"
      style={{
        backgroundColor: priority === 'High' ? '#ef4444' : priority === 'Medium' ? '#f59e0b' : '#10b981',
      }}
    ></div>
  );
};

PriorityIndicator.propTypes = {
  priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
};

export default PriorityIndicator;
