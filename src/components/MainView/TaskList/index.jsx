import Header from '@/components/MainView/TaskList/Header';
import TaskItem from '@/components/MainView/TaskList/TaskItem';
import EmptyTasksMessage from '@/components/MainView/TaskList/EmptyTasksMessage';
import useFilteredTasks from '@/hooks/useFilteredTasks';

const TaskList = () => {
  const filteredTasks = useFilteredTasks();
  return (
    <>
      <Header />

      {filteredTasks.length === 0 && <EmptyTasksMessage />}

      <ul className="space-y-4">
        {filteredTasks.map((item) => (
          <TaskItem key={item.id} task={item} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
