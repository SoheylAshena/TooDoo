import TaskItem from "./TaskItem/TaskItem";
import { filteredData } from "../Utilities/filteredTasks";
import { useSelector } from "react-redux";
import Header from "./Header";
import EmptyTasksMessage from "./EmptyTasksMessage";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const filterOptions = useSelector((state) => state.filters);
  const filteredTasks = filteredData(tasks, filterOptions);
  return (
    <>
      <Header filterOptions={filterOptions} />
      {filteredTasks.length === 0 && (
        <EmptyTasksMessage filterOptions={filterOptions} />
      )}
      <ul className="space-y-4">
        {filteredTasks.map((item) => (
          <TaskItem key={item.id} task={item} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
