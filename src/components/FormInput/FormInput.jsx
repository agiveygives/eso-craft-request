import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from 'terra-form-input/lib/InputField';
import Text from 'terra-text';
import { SET_ESO_NAME } from '../../store/constants';

const propTypes = {
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,

  // from redux
  esoUsername: PropTypes.string.isRequired,
  setEsoUsername: PropTypes.func.isRequired
};

const FormInput = ({ label, helpText, esoUsername, setEsoUsername }) => (
  <InputField
    inputId="username-input"
    label={
      <Text style={{ color: '#dddacb' }} fontSize={18} weight={400}>{label}</Text>
    }
    help={
      <Text style={{ color: '#dddacb' }} fontSize={16} weight={200}>{helpText}</Text>
    }
    value={esoUsername}
    style={{ color: 'black' }}
    onChange={event => setEsoUsername(event.currentTarget.value)}
  />
)

FormInput.propTypes = propTypes;

const mapStateToProps = state => ({
  esoUsername: state.esoName
});

const mapDispatchToProps = dispatch => ({
  setEsoUsername: username => dispatch({ type: SET_ESO_NAME, username })
})

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);
