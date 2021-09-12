import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

// Material-UI
import { Typography, FormHelperText } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { createStyles } from '@material-ui/core/styles';

import { UPDATE_PAYMENT_TYPE } from '../../store/constants';
import { generateSelectOptions } from '../../utils';

const propTypes = {
  paymentType: PropTypes.string.isRequired,
  updatePaymentOption: PropTypes.func.isRequired,
  paymentOptions: PropTypes.arrayOf(PropTypes.oneOf('user.payment.materials', 'user.payment.gold')),
};

const styles = createStyles({
  select: {
    background: '#e8e9ea',
    borderRadius: 3,
    color: 'black',
    padding: '0.2rem',
    minWidth: '7rem',
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
  helperText: {
    color: '#dddacb',
    maxWidth: '7rem',
    whiteSpace: 'nowrap',
  },
  wrapper: {
    paddingLeft: '0.5rem',
  },
});

const PaymentOption = ({ paymentType, updatePaymentOption, paymentOptions }) => {
  const intl = useIntl();

  return (
    <span className="centered-div">
      <Typography variant="h5">{intl.formatMessage({ id: 'user.payment.text' })}</Typography>
      <span style={styles.wrapper}>
        <Select
          style={paymentOptions.length <= 1 ? { ...styles.select, ...styles.disabled } : styles.select}
          value={paymentType}
          onChange={(event) => updatePaymentOption(event.target.value)}
          disabled={paymentOptions.length <= 1}
        >
          {paymentOptions.map((option) => generateSelectOptions(option, `Payment Option - ${option}`, {}, intl))}
        </Select>
        {(paymentOptions.length > 1 && paymentOptions.includes('user.payment.materials')) && (
          <FormHelperText style={styles.helperText}>
            {intl.formatMessage({ id: 'user.payment.tooltip' })}
          </FormHelperText>
        )}
      </span>
    </span>
  );
};

PaymentOption.propTypes = propTypes;

PaymentOption.defaultProps = {
  paymentOptions: [
    'user.payment.materials',
    'user.payment.gold',
  ],
};

const mapStateToProps = (state) => ({
  paymentType: state.payment,
  paymentOptions: state.guildData.paymentOptions,
});

const mapDispatchToProps = (dispatch) => ({
  updatePaymentOption: (payment) => dispatch(
    { type: UPDATE_PAYMENT_TYPE, value: payment },
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption);
