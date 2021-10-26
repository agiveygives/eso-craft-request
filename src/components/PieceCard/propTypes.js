import PropTypes from 'prop-types';
import GearAttributesShape from '../../propShapes/gearAttributesShape';

const propTypes = {
  group: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,
  piece: PropTypes.string.isRequired,

  // from redux
  gearAttributes: GearAttributesShape.isRequired,
  updateAttributes: PropTypes.func.isRequired,
  glyphVal: PropTypes.string,
};

export default propTypes;
