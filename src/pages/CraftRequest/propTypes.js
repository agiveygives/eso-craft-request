import PropTypes from 'prop-types';

const propTypes = {
  termsAccepted: PropTypes.bool.isRequired,
  guildMnemonic: PropTypes.string.isRequired,
  acceptTerms: PropTypes.func.isRequired,
};

export default propTypes;
