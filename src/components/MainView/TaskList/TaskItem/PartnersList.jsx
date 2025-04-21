import PropTypes from 'prop-types';

const PartnersList = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {partners.map((partner) => (
        <span
          key={partner}
          className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-600 dark:bg-purple-900 dark:text-purple-300"
        >
          {partner}
        </span>
      ))}
    </div>
  );
};

PartnersList.displayName = 'PartnersList';

PartnersList.propTypes = {
  partners: PropTypes.array,
};

export default PartnersList;
