import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { UPDATE_NOTES } from '../../store/constants';
import './RequestNotes.css';

const propTypes = {
  notes: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired,
};

const RequestNotes = ({ notes, updateNotes }) => (
  <div className="wrapper">
    <div className="centered-div">
      <Typography variant='h5'>Request Notes ({notes.length}/1000)</Typography>
      <Typography variant='p'><i>*optional</i></Typography>
    </div>
    <div className="centered-div">
      <textarea
        className="request-notes"
        placeholder="Notes to the crafter about the request or payment."
        value={notes}
        maxLength={1000}
        onChange={(event) => updateNotes(event.target.value)}
      />
    </div>
  </div>
);

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
