import PropTypes from 'prop-types';
import NavItemInfo from '@/components/SideBar/Navigation/NavItemInfo';
import NavItemCount from '@/components/SideBar/Navigation/NavItemCount';
import { useNavigationItem } from '@/hooks/useNavigationItem';

const NavItem = ({ icon, text, name, onToggleSidebar }) => {
  const { className, handleSelect } = useNavigationItem(name, onToggleSidebar);

  return (
    <li onClick={handleSelect} className={className}>
      <NavItemInfo icon={icon} text={text} />
      <NavItemCount navItem={name} />
    </li>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string,
  onToggleSidebar: PropTypes.func,
};

export default NavItem;
