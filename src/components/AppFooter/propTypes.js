import PropTypes from 'prop-types';
import {
  armorAttributesShape, jewelryAttributesShape, weaponAttributesShape,
} from '../../propShapes';

const propTypes = {
  currentState: PropTypes.shape({
    esoName: PropTypes.string.isRequired,
    armorPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
    jewelryPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
    weaponPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
    armorAttributes: armorAttributesShape.isRequired,
    jewelryAttributes: jewelryAttributesShape.isRequired,
    weaponAttributes: weaponAttributesShape.isRequired,
  }).isRequired,
  restart: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired,
  guildName: PropTypes.string.isRequired,
  guildMnemonic: PropTypes.string.isRequired,
  guildWebsite: PropTypes.string.isRequired,
  guildFooterColor: PropTypes.string.isRequired,
};

export default propTypes;
