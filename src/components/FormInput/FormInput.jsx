import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from 'terra-form-input/lib/InputField';
import { Typography } from '@material-ui/core';
import { SET_ESO_NAME } from '../../store/constants';

const propTypes = {
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,

  // from redux
  esoUsername: PropTypes.string.isRequired,
  setEsoUsername: PropTypes.func.isRequired,
};

const defaultProps = {
  helpText: '',
};

const FormInput = ({
  label, helpText, esoUsername, setEsoUsername,
}) => (
  <InputField
    inputId="username-input"
    label={
      <Typography style={{ color: '#dddacb' }} variant="h6">{label}</Typography>
    }
    help={
      <Typography style={{ color: '#dddacb' }} variant="body1">{helpText}</Typography>
    }
    value={esoUsername}
    style={{ color: 'black' }}
    onChange={(event) => setEsoUsername(event.currentTarget.value)}
  />
);

FormInput.defaultProps = defaultProps;
FormInput.propTypes = propTypes;

const mapStateToProps = (state) => ({
  esoUsername: state.esoName,
});

const mapDispatchToProps = (dispatch) => ({
  setEsoUsername: (username) => dispatch({ type: SET_ESO_NAME, username }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);
