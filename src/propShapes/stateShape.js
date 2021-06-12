import PropTypes from 'prop-types';
import ArmorAttributesShape from './armorAttributesShape';
import JewelryAttributesShape from './jewelryAttributesShape';
import WeaponAttributesShape from './weaponAttributesShape';

const stateShape = PropTypes.shape({
  review: PropTypes.bool.isRequired,
  esoName: PropTypes.string.isRequired,
  gearLeveL: PropTypes.string.isRequired,
  payment: PropTypes.oneOf(['user.payment.materials', 'user.payment.gold']).isRequired,
  armorPieces: PropTypes.arrayOf(PropTypes.oneOf([
    'gear.armor.head',
    'gear.armor.shoulder',
    'gear.armor.chest',
    'gear.armor.legs',
    'gear.armor.waist',
    'gear.armor.hands',
    'gear.armor.feet',
  ]).isRequired).isRequired,
  jewelryPieces: PropTypes.arrayOf(PropTypes.oneOf([
    'gear.jewelry.necklace',
    'gear.jewelry.ring',
  ]).isRequired).isRequired,
  weaponPieces: PropTypes.arrayOf(PropTypes.oneOf([
    'gear.weapon.primary',
    'gear.weapon.secondary',
  ]).isRequired).isRequired,
  armorAttributes: ArmorAttributesShape.isRequired,
  jewelyAttributes: JewelryAttributesShape.isRequired,
  weaponAttributes: WeaponAttributesShape.isRequired,
});

export default stateShape;
