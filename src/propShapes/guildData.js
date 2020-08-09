import PropTypes from 'prop-types';

export default PropTypes.shape({
  colors: PropTypes.shape({
    footer: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }).isRequired,
  crafterTag: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  mnemonic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  webhook: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
});
