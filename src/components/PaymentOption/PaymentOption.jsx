import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Spacer from 'terra-spacer';

// Material-UI
import Select from '@material-ui/core/Select';
import Tooltip from '../Tooltip/Tooltip';
import { createStyles } from '@material-ui/core/styles';

import { UPDATE_PAYMENT_TYPE } from '../../store/constants';
import Utils from '../../utils';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,

  // from redux
  paymentType: PropTypes.string.isRequired,
  updatePaymentOption: PropTypes.func.isRequired
};

const styles = createStyles({
  select: {
    background: 'white',
    borderRadius: 3,
    color: 'black',
    padding: '0.2rem',
    minWidth: '7rem'
  }
});

const PaymentOption = ({ options, paymentType, updatePaymentOption }) => (
  <span className="centered-div">
    <Typography variant='h5'>I will be paying with </Typography>
    <Spacer paddingLeft="small">
      <Tooltip
        title="Crafters are more likely to accept material payments"
        placement="right"
      >
        <Select
          style={styles.select}
          value={paymentType}
          onChange={event => updatePaymentOption(event.target.value)}
        >
          {options.map(Utils.generateSelectOptions)}
        </Select>
      </Tooltip>
    </Spacer>
  </span>
);

PaymentOption.propTypes = propTypes;

PaymentOption.defaultProps = {
  options: ['Materials', 'Gold']
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