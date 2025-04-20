import { useToggleSidebar, useOutsideClickSidebar } from '@/hooks/useSidebar';

// Components import
import Navigation from '@/components/SideBar/Navigation';
import Category from '@/components/SideBar/CategoryBar';
import SideBarButton from '@/components/SideBar/SideBarButton';
import SideBarHeader from '@/components/SideBar/SideBarHeader';

const styles = {
  sidebar:
    'custom-scrollbar fixed z-40 flex h-full w-80 -translate-x-full transform flex-col gap-4 overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out md:static md:min-w-[330px] md:translate-x-0 dark:bg-gray-900',
};

const SideBar = () => {
  const { sidebarRef, toggleSidebarHandler } = useToggleSidebar();

  // Hook for closing sidebar on outside click
  useOutsideClickSidebar(sidebarRef);

  return (
    <>
      {/* Button to toggle sidebar */}
      <SideBarButton onclick={toggleSidebarHandler} />

      {/* The Sidebar */}
      <section ref={sidebarRef} className={styles.sidebar} aria-label="Sidebar">
        <SideBarHeader />
        <Navigation onToggleSidebar={toggleSidebarHandler} />
        <Category onToggleSidebar={toggleSidebarHandler} />
      </section>
    </>
  );
};

export default SideBar;
