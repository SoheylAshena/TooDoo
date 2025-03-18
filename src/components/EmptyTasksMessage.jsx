import PropTypes from "prop-types";

const EmptyTasksMessage = ({ filterOptions }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-12 text-center shadow-sm">
      <img
        src="/icons/empty-tasks.svg"
        alt="No tasks"
        className="mb-4 h-32 w-32 opacity-50"
        onError={(e) => (e.target.style.display = "none")}
      />
      <p className="text-xl font-medium text-gray-700">No tasks found</p>
      <p className="mt-2 text-gray-500">
        {filterOptions.search ||
        filterOptions.status !== "all" ||
        filterOptions.category !== "all" ||
        filterOptions.priority !== "all"
          ? "Try changing your filters or create a new task"
          : "Get started by adding your first task"}
      </p>
    </div>
  );
};

EmptyTasksMessage.propTypes = {
  filterOptions: PropTypes.shape({
    search: PropTypes.string,
    status: PropTypes.string,
    category: PropTypes.string,
    priority: PropTypes.string,
  }).isRequired,
};

export default EmptyTasksMessage;
