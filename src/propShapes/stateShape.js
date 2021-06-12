import PropTypes from 'prop-types';
import ArmorAttributesShape from './armorAttributesShape';
import JewelryAttributesShape from './jewelryAttributesShape';
import WeaponAttributesShape from './weaponAttributesShape';

const stateShape = PropTypes.shape({
  review: PropTypes.bool.isRequired,
  esoName: PropTypes.string.isRequired,
  gearLevel: PropTypes.string.isRequired,
  payment: PropTypes.oneOf(['user.payment.materials', 'user.payment.gold']).isRequired,
  armorPieces: PropTypes.arrayOf(PropTypes.oneOf([
    'head',
    'shoulder',
    'chest',
    'legs',
    'waist',
    'hands',
    'feet',
  ]).isRequired).isRequired,
  jewelryPieces: PropTypes.arrayOf(PropTypes.oneOf([
    'necklace',
    'ring1',
    'ring2',
  ]).isRequired).isRequired,
  weaponPieces: PropTypes.arrayOf(PropTypes.oneOf([
    'primary1',
    'secondary1',
    'primary2',
    'secondary2',
  ]).isRequired).isRequired,
  armorAttributes: ArmorAttributesShape,
  jewelyAttributes: JewelryAttributesShape,
  weaponAttributes: WeaponAttributesShape,
});

export default stateShape;
