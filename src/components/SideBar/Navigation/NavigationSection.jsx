import PropTypes from "prop-types";

const NavigationSection = ({ title, children }) => (
  <div className="mb-4">
    {title && (
      <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
        {title}
      </h3>
    )}
    <ul className="space-y-1">{children}</ul>
  </div>
);

NavigationSection.displayName = "NavigationSection";

NavigationSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default NavigationSection;
