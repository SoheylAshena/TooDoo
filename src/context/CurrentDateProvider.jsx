import PropTypes from 'prop-types';
import CurrentDateContext from './CurrentDateContext';
import useCalendarState from '@/hooks/Calendar/useCalendarState';

const CurrentDateProvider = ({ children }) => {
  const { currentDate, setCurrentDate } = useCalendarState();

  return <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>{children}</CurrentDateContext.Provider>;
};

CurrentDateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CurrentDateProvider;
