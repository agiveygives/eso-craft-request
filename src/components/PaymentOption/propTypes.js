import PropTypes from 'prop-types';

const propTypes = {
  paymentType: PropTypes.string.isRequired,
  updatePaymentOption: PropTypes.func.isRequired,
  paymentOptions: PropTypes.arrayOf(PropTypes.oneOf(['user.payment.materials', 'user.payment.gold'])),
};

export default propTypes;
