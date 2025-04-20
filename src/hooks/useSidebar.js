import { useRef, useCallback, useEffect } from 'react';

// Sidebar open/close helpers
function openSidebar(sidebar) {
  sidebar.classList.remove('-translate-x-full');
}
function closeSidebar(sidebar) {
  sidebar.classList.add('-translate-x-full');
}
function isSidebarOpen(sidebar) {
  return sidebar && !sidebar.classList.contains('-translate-x-full');
}

// Hook for sidebar logic only
export function useToggleSidebar() {
  const sidebarRef = useRef(null);

  const toggleSidebarHandler = useCallback((event) => {
    if (event) event.stopPropagation();
    const sidebar = sidebarRef.current;
    if (sidebar) {
      if (isSidebarOpen(sidebar)) {
        closeSidebar(sidebar);
      } else {
        openSidebar(sidebar);
      }
    }
  }, []);

  return { sidebarRef, toggleSidebarHandler };
}

// Hook for handling outside click to close sidebar
export function useOutsideClickSidebar(sidebarRef) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = sidebarRef.current;
      if (sidebar && isSidebarOpen(sidebar) && !sidebar.contains(event.target)) {
        closeSidebar(sidebar);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarRef]);
}
