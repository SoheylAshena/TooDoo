import PropTypes from "prop-types";
import { AiOutlineClockCircle } from "react-icons/ai";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Extracted DateLabel component to reduce rerenders
const DateLabel = ({ date }) => (
  <span className="flex items-center rounded-md bg-gray-50 px-2 py-0.5 dark:bg-gray-800 dark:text-gray-400">
    <AiOutlineClockCircle className="mr-1" />
    {formatDate(date)}
  </span>
);

DateLabel.displayName = "DateLabel";

DateLabel.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateLabel;
