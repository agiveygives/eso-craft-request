import PropTypes from 'prop-types';
import GearAttributesShape from '../../../propShapes/gearAttributesShape';

const propTypes = {
  piece: PropTypes.string.isRequired,
  data: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired,
      isFixed: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
    default: PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.oneOf([
        'Glyph',
        'Glyph Quality',
        'Trait',
        'Quality',
        'Set',
        'Style',
        'Weapon',
        'Weight',
      ]).isRequired,
      isFixed: PropTypes.bool.isRequired,
    }),
    key: PropTypes.string,
  }).isRequired,
  gridSize: PropTypes.number.isRequired,
  gearAttributes: GearAttributesShape.isRequired,
  updateAttributes: PropTypes.func.isRequired,
  glyphVal: PropTypes.string.isRequired,
  setAllOptions: PropTypes.func.isRequired,
  allPieceOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shieldOptions: PropTypes.arrayOf(PropTypes.shape({})),
};

export default propTypes;
