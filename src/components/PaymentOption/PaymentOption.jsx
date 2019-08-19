import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma from 'chroma-js';
import Text from 'terra-text';
import Spacer from 'terra-spacer';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import { UPDATE_PAYMENT_TYPE } from '../../store/constants';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired
  })).isRequired,

  // from redux
  updatePaymentOption: PropTypes.func.isRequired
};

const colourStyles = {
  container: styles => ({ ...styles, width: '8em' }),
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: styles => ({ ...styles }),
  placeholder: styles => ({ ...styles }),
  singleValue: (styles, { data }) => ({ ...styles }),
};

const PaymentOption = ({ options, updatePaymentOption }) => (
  <span className="centered-div">
    <Text fontSize={20} weight={400}>I will be paying with </Text>
    <Spacer paddingLeft="small">
      <a data-for="payment-option" data-tip data-place="right">
        <Select
          defaultValue={options[0]}
          options={options}
          styles={colourStyles}
          onChange={option => updatePaymentOption(option.label)}
        />
      </a>
      <ReactTooltip id="payment-option" type="warning">
        Crafters are more likely to accept material payments
      </ReactTooltip>
    </Spacer>
  </span>
);

PaymentOption.propTypes = propTypes;

PaymentOption.defaultProps = {
  options: [{ label: 'Materials', color: 'white', isFixed: true }, { label: 'Gold', color: 'white', isFixed: true }]
}

const mapDispatchToProps = dispatch => ({
  updatePaymentOption: payment => dispatch({ type: UPDATE_PAYMENT_TYPE, value: payment })
});

export default connect(null, mapDispatchToProps)(PaymentOption);