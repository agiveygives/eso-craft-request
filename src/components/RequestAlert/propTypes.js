import PropTypes from 'prop-types';

const propTypes = {
  isSuccessful: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  retry: PropTypes.func.isRequired,
};

export default propTypes;
