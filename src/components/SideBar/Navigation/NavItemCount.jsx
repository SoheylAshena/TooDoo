import propTypes from 'prop-types';
import useTaskCounts from '@/hooks/useTaskCounts';

const NavItemCount = ({ navItem }) => {
  const taskCounts = useTaskCounts();
  const count = taskCounts[navItem];

  return <span className="text-xs font-semibold">{count}</span>;
};

export default NavItemCount;

NavItemCount.propTypes = {
  navItem: propTypes.string.isRequired,
};
