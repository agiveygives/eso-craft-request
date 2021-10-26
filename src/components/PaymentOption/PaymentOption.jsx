import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { Typography, FormHelperText } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { UPDATE_PAYMENT_TYPE } from '../../store/constants';
import { generateSelectOptions } from '../../utils';
import useStyles from './styles';
import propTypes from './propTypes';

const PaymentOption = ({ paymentType, updatePaymentOption, paymentOptions }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <span className="centered-div">
      <Typography variant="h5">{intl.formatMessage({ id: 'user.payment.text' })}</Typography>
      <span className={classes.wrapper}>
        <Select
          className={clsx(classes.select, paymentOptions.length <= 1 && classes.disabled)}
          value={paymentType}
          onChange={(event) => updatePaymentOption(event.target.value)}
          disabled={paymentOptions.length <= 1}
        >
          {paymentOptions.map((option) => generateSelectOptions(option, `Payment Option - ${option}`, {}, intl))}
        </Select>
      </span>
      <span>
        {(paymentOptions.length > 1 && paymentOptions.includes('user.payment.materials')) && (
          <FormHelperText className={classes.helperText}>
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
