import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  IconButton, Snackbar, SnackbarContent, Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { RESTART, RETRY } from '../../store/constants';
import propTypes from './propTypes';

const RequestAlert = ({
  isSuccessful,
  isFailed,
  reset,
  retry,
}) => {
  const intl = useIntl();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(green[600]);
  const [message, setMessage] = useState(intl.formatMessage({ id: 'alert.success' }));

  useEffect(() => {
    if (isSuccessful || isFailed) {
      setSnackbarOpen(true);

      if (isSuccessful) {
        setBackgroundColor(green[600]);
        setMessage(intl.formatMessage({ id: 'alert.success' }));
      }

      if (isFailed) {
        setBackgroundColor(red[600]);
        setMessage(intl.formatMessage({ id: 'alert.failure' }));
      }
    } else {
      setSnackbarOpen(false);
    }
  }, [isSuccessful, isFailed, intl]);

  const onClose = () => {
    setSnackbarOpen(false);

    if (isSuccessful) reset();
    if (isFailed) retry();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
      onClose={onClose}
      open={snackbarOpen}
    >
      <SnackbarContent
        style={{ backgroundColor, margin: '1em' }}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>,
        ]}
        message={<Typography>{message}</Typography>}
      />
    </Snackbar>
  );
};

RequestAlert.propTypes = propTypes;

const mapStateToProps = (state) => ({
  isSuccessful: state.success,
  isFailed: state.failed,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch({ type: RESTART }),
  retry: () => dispatch({ type: RETRY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestAlert);
