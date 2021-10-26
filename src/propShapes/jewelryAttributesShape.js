import PropTypes from 'prop-types';

export default PropTypes.shape({
  display: PropTypes.oneOf(['gear.jewelry']).isRequired,
  necklace: PropTypes.shape({
    display: PropTypes.oneOf(['gear.jewelry.necklace']).isRequired,
    Quality: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
  }),
  ring1: PropTypes.shape({
    display: PropTypes.oneOf(['gear.jewelry.ring']).isRequired,
    Quality: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
  }),
  ring2: PropTypes.shape({
    display: PropTypes.oneOf(['gear.jewelry.ring']).isRequired,
    Quality: PropTypes.string.isRequired,
    Trait: PropTypes.string.isRequired,
    Glyph: PropTypes.string.isRequired,
    'Glyph Quality': PropTypes.string.isRequired,
    Set: PropTypes.string.isRequired,
  }),
});
