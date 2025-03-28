import { MdOutlinePriorityHigh, MdOutlineLowPriority } from "react-icons/md";

const getPriorityBadge = (priority) => {
  const lowerPriority = priority?.toLowerCase() || "medium";

  if (lowerPriority === "high") {
    return (
      <span className="flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
        <MdOutlinePriorityHigh className="mr-1" />
        High
      </span>
    );
  } else if (lowerPriority === "low") {
    return (
      <span className="flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
        <MdOutlineLowPriority className="mr-1" />
        Low
      </span>
    );
  } else {
    return (
      <span className="flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        <MdOutlinePriorityHigh className="mr-1" />
        Medium
      </span>
    );
  }
};

export default getPriorityBadge;
