import { useSelector } from "react-redux";
import TaskList from "./TaskList";
import Calendar from "./Calendar";

const MainBody = () => {
  const currentView = useSelector((state) => state.current);

  return (
    <div className="custom-scrollbar min-h-screen w-full overflow-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pt-14 md:pt-4 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900">
      <div className="mx-auto">
        {currentView === "calendar" ? <Calendar /> : <TaskList />}
      </div>
    </div>
  );
};

export default MainBody;
