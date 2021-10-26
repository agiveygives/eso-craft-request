import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  craftableLevels: PropTypes.bool.isRequired,

  // from redux
  updateGearLevel: PropTypes.func.isRequired,
};

export default propTypes;
