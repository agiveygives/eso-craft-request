import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { UPDATE_NOTES } from '../../store/constants';
import './RequestNotes.css';

const propTypes = {
  notes: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired,
};

const RequestNotes = ({ notes, updateNotes }) => {
  const intl = useIntl();

  return (
    <div className="wrapper">
      <div className="centered-div">
        <Typography variant='h5'>{
          intl.formatMessage(
            { id: 'user.requestNotes.header' },
            { total: notes.length }
          )
        }</Typography>
        <Typography variant='body1'><i>*{intl.formatMessage({ id: 'user.requestNotes.optional' })}</i></Typography>
      </div>
      <div className="centered-div">
        <textarea
          className="request-notes"
          placeholder={intl.formatMessage({ id: 'user.requestNotes.placeholder' })}
          value={notes}
          maxLength={1000}
          onChange={(event) => updateNotes(event.target.value)}
        />
      </div>
    </div>
  )
};

RequestNotes.propTypes = propTypes;

const mapStateToProps = state => ({
  notes: state.notes
});

const mapDispatchToProps = dispatch => ({
  updateNotes: notes => dispatch(
    { type: UPDATE_NOTES, notes }
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestNotes);
