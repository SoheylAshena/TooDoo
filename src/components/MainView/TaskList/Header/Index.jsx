import { BsFilter } from 'react-icons/bs';
import useFilterMenu from '@/hooks/useFilterMenu';
import FilterPanel from '@/components/MainView/TaskList/Header/FilterPanel';

const Header = () => {
  const { showFilters, toggleFilters } = useFilterMenu();

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className={styles.headerText}>Tasks Manager</h2>
        <button onClick={toggleFilters} className={styles.filterButton}>
          <BsFilter className={styles.filterIcon} />
          Filters & Sort
        </button>
      </div>

      {showFilters && <FilterPanel />}
    </>
  );
};

export default Header;

const styles = {
  headerText: 'text-3xl font-bold tracking-tight text-indigo-800 dark:text-indigo-200',
  filterButton:
    'flex items-center rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800',
  filterIcon: 'mr-2 text-lg',
};
