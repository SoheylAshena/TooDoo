import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import AddTaskForm from "../components/SideBar/AddTaskForm";

// Create context
const ModalContext = createContext();

// Provider component
export const ModalProvider = ({ children }) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        openAddTaskModal,
        closeAddTaskModal,
      }}
    >
      {children}

      {isAddTaskModalOpen && <AddTaskForm onClose={closeAddTaskModal} />}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
