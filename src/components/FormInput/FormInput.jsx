import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { Typography, TextField } from '@material-ui/core';
import { SET_ESO_NAME } from '../../store/constants';
import useStyles from './styles';
import propTypes from './propTypes';

const FormInput = ({
  label, esoUsername, setEsoUsername,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setIsInvalid(esoUsername.length > 0 && esoUsername[0] !== '@');
  }, [esoUsername]);

  return (
    <span>
      <Typography style={{ color: '#dddacb' }} variant="h6">{label}</Typography>
      <TextField
        error={isInvalid}
        id="username-input"
        variant="outlined"
        placeholder="@JukesMcGee"
        helperText={isInvalid ? intl.formatMessage({ id: 'user.invalidUsername' }) : undefined}
        value={esoUsername}
        onChange={(event) => setEsoUsername(event.currentTarget.value)}
        InputProps={{ className: classes.input }}
        size="small"
      />
    </span>
  );
};

FormInput.propTypes = propTypes;

const mapStateToProps = (state) => ({
  esoUsername: state.esoName,
});

const mapDispatchToProps = (dispatch) => ({
  setEsoUsername: (username) => dispatch({ type: SET_ESO_NAME, username }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);
