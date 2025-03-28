import PropTypes from "prop-types";

const CategoryLabel = ({ category }) => (
  <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
    {category}
  </span>
);

CategoryLabel.displayName = "CategoryLabel";

CategoryLabel.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryLabel;
