import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

// Material-UI
import Select from '@material-ui/core/Select';
import { createStyles } from '@material-ui/core/styles';
import Tooltip from '../Tooltip/Tooltip';

import { UPDATE_PAYMENT_TYPE } from '../../store/constants';
import Utils from '../../utils';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),

  // from redux
  paymentType: PropTypes.string.isRequired,
  updatePaymentOption: PropTypes.func.isRequired,
};

const defaultProps = {
  options: ['Materials', 'Gold'],
};

const styles = createStyles({
  select: {
    background: '#e8e9ea',
    borderRadius: 3,
    color: 'black',
    padding: '0.2rem',
    minWidth: '7rem',
  },
  wrapper: {
    paddingLeft: '0.5rem',
  },
});

const PaymentOption = ({ options, paymentType, updatePaymentOption }) => (
  <span className="centered-div">
    <Typography variant="h5">I will be paying with </Typography>
    <span style={styles.wrapper}>
      <Tooltip
        title="Crafters are more likely to accept material payments"
        placement="right"
      >
        <Select
          style={styles.select}
          value={paymentType}
          onChange={(event) => updatePaymentOption(event.target.value)}
        >
          {options.map(Utils.generateSelectOptions)}
        </Select>
      </Tooltip>
    </span>
  </span>
);

PaymentOption.propTypes = propTypes;

PaymentOption.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  paymentType: state.payment,
});

const mapDispatchToProps = (dispatch) => ({
  updatePaymentOption: (payment) => dispatch(
    { type: UPDATE_PAYMENT_TYPE, value: payment },
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption);
