import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { Typography } from '@material-ui/core';

// Material-UI
import Select from '@material-ui/core/Select';
import Tooltip from '../Tooltip/Tooltip';
import { createStyles } from '@material-ui/core/styles';

import { UPDATE_PAYMENT_TYPE } from '../../store/constants';
import Utils from '../../utils';

const propTypes = {
  paymentType: PropTypes.string.isRequired,
  updatePaymentOption: PropTypes.func.isRequired
};

const styles = createStyles({
  select: {
    background: '#e8e9ea',
    borderRadius: 3,
    color: 'black',
    padding: '0.2rem',
    minWidth: '7rem'
  },
  wrapper: {
    paddingLeft: '0.5rem'
  }
});

const PaymentOption = ({ paymentType, updatePaymentOption }) => {
  const intl = useIntl();
  const paymentOptions = [
    'user.payment.materials',
    'user.payment.gold',
  ]

  return (
    <span className="centered-div">
      <Typography variant='h5'>{intl.formatMessage({ id: 'user.payment.text' })}</Typography>
      <span style={styles.wrapper}>
        <Tooltip
          title={intl.formatMessage({ id: 'user.payment.tooltip' })}
          placement="right"
        >
          <Select
            style={styles.select}
            value={paymentType}
            onChange={event => updatePaymentOption(event.target.value)}
          >
            {paymentOptions.map(option => Utils.generateSelectOptions(option, `Payment Option - ${option}`, {}, intl))}
          </Select>
        </Tooltip>
      </span>
    </span>
  )
};

PaymentOption.propTypes = propTypes;

PaymentOption.defaultProps = {

};

const mapStateToProps = state => ({
  paymentType: state.payment
});

const mapDispatchToProps = dispatch => ({
  updatePaymentOption: payment => dispatch(
    { type: UPDATE_PAYMENT_TYPE, value: payment }
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption);