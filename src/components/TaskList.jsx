import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const TaskList = ({ filteredTasks, dispatch, toggleTask, deleteTasks }) => {
  return (
    <ul className="space-y-4">
      {filteredTasks.map((item) => (
        <TaskItem
          key={item.id}
          task={item}
          dispatch={dispatch}
          toggleTask={toggleTask}
          deleteTasks={deleteTasks}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTasks: PropTypes.func.isRequired,
};

export default TaskList;
