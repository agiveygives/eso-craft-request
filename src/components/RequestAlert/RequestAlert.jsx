import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IconButton, Snackbar, SnackbarContent, Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { RESTART, RETRY } from '../../store/constants';

const propTypes = {
  isSuccessful: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  retry: PropTypes.func.isRequired,
};

const RequestAlert = ({
  isSuccessful,
  isFailed,
  reset,
  retry,
}) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [backgroundColor, setBackgroundColor] = React.useState(green[600]);
  const [message, setMessage] = React.useState('Your request was sent to discord.');

  React.useEffect(() => {
    if (isSuccessful || isFailed) {
      setSnackbarOpen(true);

      if (isSuccessful) {
        setBackgroundColor(green[600]);
        setMessage('Your request was sent to discord.');
      }

      if (isFailed) {
        setBackgroundColor(red[600]);
        setMessage(
          'Failed to send request, please try again. If the problem persists, contact @JukesMcGee on discord.',
        );
      }
    } else {
      setSnackbarOpen(false);
    }
  }, [isSuccessful, isFailed]);

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
