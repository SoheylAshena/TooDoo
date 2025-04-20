import PropTypes from "prop-types";

const TagsList = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
        >
          {tag}
        </span>
      ))}
    </>
  );
};

TagsList.displayName = "TagsList";

TagsList.propTypes = {
  tags: PropTypes.array,
};

export default TagsList;
