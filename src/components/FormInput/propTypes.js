import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,

  // from redux
  esoUsername: PropTypes.string.isRequired,
  setEsoUsername: PropTypes.func.isRequired,
};

export default propTypes;
