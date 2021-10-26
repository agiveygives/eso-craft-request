import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,

  // from redux
  selectedPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
  updatePieces: PropTypes.func.isRequired,
};

export default propTypes;
