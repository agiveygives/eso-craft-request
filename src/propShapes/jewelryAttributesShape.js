import PropTypes from 'prop-types';

export default PropTypes.shape({
  display: 'gear.jewelry',
  necklace: {
    display: 'gear.jewelry.necklace',
    Quality: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
  },
  ring1: {
    display: 'gear.jewelry.ring',
    Quality: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
  },
  ring2: {
    display: 'gear.jewelry.ring',
    Quality: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
  },
});
