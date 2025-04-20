import { useSelector } from 'react-redux';
import TaskList from '@/components/MainView/TaskList';
import Calendar from '@/components/MainView/Calendar';

const MainView = () => {
  const currentView = useSelector((state) => state.current);

  return (
    <section className={styles.mainView}>
      {currentView === 'calendar' ? <Calendar /> : <TaskList />}
    </section>
  );
};

export default MainView;

const styles = {
  mainView:
    'min-h-screen w-full overflow-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pt-14 md:pt-4 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950',
};
