const EmptyTasksMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">
      <img src="empty-tasks.svg" alt="No tasks" className="mb-4 h-32 w-32 opacity-50" />
      <p className="text-xl font-medium text-gray-700 dark:text-gray-300">No tasks found</p>
    </div>
  );
};

export default EmptyTasksMessage;
