import PropTypes from 'prop-types';

export default PropTypes.shape({
  display: 'Armor',
  head: {
    display: 'Head',
    Quality: PropTypes.string.isRequired,
    Weight: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Style: PropTypes.string.isRequired,
  },
  shoulder: {
    display: 'Shoulder',
    Quality: PropTypes.string.isRequired,
    Weight: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Style: PropTypes.string.isRequired,
  },
  chest: {
    display: 'Chest',
    Quality: PropTypes.string.isRequired,
    Weight: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Style: PropTypes.string.isRequired,
  },
  legs: {
    display: 'Legs',
    Quality: PropTypes.string.isRequired,
    Weight: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Style: PropTypes.string.isRequired,
  },
  waist: {
    display: 'Waist',
    Quality: PropTypes.string.isRequired,
    Weight: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Style: PropTypes.string.isRequired,
  },
  hands: {
    display: 'Hands',
    Quality: PropTypes.string.isRequired,
    Weight: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Style: PropTypes.string.isRequired,
  },
  feet: {
    display: 'Feet',
    Quality: PropTypes.string.isRequired,
    Weight: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
    Style: PropTypes.string.isRequired,
  },
});
