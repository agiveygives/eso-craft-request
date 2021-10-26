import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Typography, TextField } from '@material-ui/core';
import { UPDATE_NOTES } from '../../store/constants';
import useStyles from './styles';

const propTypes = {
  notes: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired,
};

const RequestNotes = ({ notes, updateNotes }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.wrapper}>
      <div className="centered-div">
        <Typography variant="h5">
          {
          intl.formatMessage(
            { id: 'user.requestNotes.header' },
            { total: notes.length },
          )
        }
        </Typography>
      </div>
      <div className="centered-div">
        <TextField
          className={classes.requestNotes}
          multiline
          label={`* ${intl.formatMessage({ id: 'user.requestNotes.optional' })}`}
          placeholder={intl.formatMessage({ id: 'user.requestNotes.placeholder' })}
          value={notes}
          onChange={(event) => updateNotes(event.target.value)}
          inputProps={{ className: classes.input, maxLength: 1000 }}
          InputLabelProps={{ className: classes.label }}
        />
      </div>
    </div>
  );
};

RequestNotes.propTypes = propTypes;

const mapStateToProps = (state) => ({
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  updateNotes: (notes) => dispatch(
    { type: UPDATE_NOTES, notes },
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestNotes);
