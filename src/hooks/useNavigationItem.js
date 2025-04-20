import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/context/Slices/filtersSlice';
import { setCurrent } from '@/context/Slices/CurrentSlice';
import { getFilterConfig } from '@/Utilities/filterUtils';
import { MOBILE_BREAKPOINT, NAV_STYLES } from '@/components/SideBar/Navigation/styles';
import clsx from 'clsx';

export const useNavigationItem = (name, onToggleSidebar) => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current);
  const config = getFilterConfig(name);

  const handleSelect = () => {
    dispatch(setCurrent(name));
    if (config) {
      dispatch(setFilters(config));
    }
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      onToggleSidebar?.();
    }
  };

  const className = clsx(
    NAV_STYLES.base,
    current === name ? NAV_STYLES.active : NAV_STYLES.inactive,
  );

  return {
    isActive: current === name,
    className,
    handleSelect,
  };
};
