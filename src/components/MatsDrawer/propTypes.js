import PropTypes from 'prop-types';

const propTypes = {
  open: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  width: PropTypes.string,
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      requestPiece: PropTypes.string.isRequired,
      gearType: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  traits: PropTypes.arrayOf(
    PropTypes.shape({
      requestPiece: PropTypes.string.isRequired,
      stone: PropTypes.string.isRequired,
    }),
  ).isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      requestPiece: PropTypes.string.isRequired,
      stone: PropTypes.string.isRequired,
    }),
  ).isRequired,
  qualityMats: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      material: PropTypes.string.isRequired,
      piece: PropTypes.string.isRequired,
    }),
  ).isRequired,
  glyphMats: PropTypes.shape({
    essenceRunes: PropTypes.arrayOf(
      PropTypes.shape({ piece: PropTypes.string.isRequired, name: PropTypes.string.isRequired }),
    ).isRequired,
    potencyRunes: PropTypes.arrayOf(
      PropTypes.shape({
        piece: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        potency: PropTypes.string,
      }),
    ).isRequired,
    aspectRunes: PropTypes.arrayOf(
      PropTypes.shape({ piece: PropTypes.string.isRequired, name: PropTypes.string.isRequired }),
    ).isRequired,
  }).isRequired,
};

export default propTypes;
