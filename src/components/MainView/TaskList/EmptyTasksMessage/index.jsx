const EmptyTasksMessage = () => {
  return (
    <div className="flex h-96 w-full flex-col items-center justify-center text-center">
      <img src="empty-tasks.svg" alt="No tasks" className="h-32 w-32" />
      <p className="text-xl font-medium text-gray-700 dark:text-gray-300">No tasks found</p>
    </div>
  );
};

export default EmptyTasksMessage;
