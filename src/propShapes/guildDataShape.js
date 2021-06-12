import PropTypes from 'prop-types';

export default PropTypes.shape({
  colors: PropTypes.shape({
    footer: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }),
  crafterTag: PropTypes.string,
  createdAt: PropTypes.string,
  createdBy: PropTypes.string,
  imageUrl: PropTypes.string,
  mnemonic: PropTypes.string,
  name: PropTypes.string,
  updatedAt: PropTypes.string,
  webhook: PropTypes.string,
  website: PropTypes.string,
});
