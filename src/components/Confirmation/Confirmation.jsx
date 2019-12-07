import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TOGGLE_REVIEW } from '../../store/constants';
import Image from 'terra-image';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ThumbsUp from '@material-ui/icons/ThumbUp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { sendRequest } from '../../store/actions';
import TheWouldBeGreat from '../../images/confirmation.png';

const propTypes = {
  // from redux
  currentState: PropTypes.shape({}).isRequired,
  sendMessage: PropTypes.func.isRequired,
  closeReview: PropTypes.func.isRequired
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const modalStyle = {
  //backgroundColor: '#e0e0e0',
  padding: '2em'
}

const useStyles = makeStyles(theme => ({
  modal: {
    backgroundColor: '#e0e0e0',
    padding: '2em'
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
  iconMargin: {
    marginRight: theme.spacing(1),
  },
}));

const Confirmation = ({ currentState, sendMessage, closeReview }) => {
  const {
    review,
    esoName,
    gearLevel,
    payment,
    armorPieces,
    jewelryPieces,
    weaponPieces,
    armorAttributes,
    jewelryAttributes,
    weaponAttributes
  } = currentState;
  const classes = useStyles();

  function pieceRows(selected, attributes) {
    let returnVal = null;

    if (selected.length) {
      returnVal = (
        <React.Fragment>
          <TableRow>
            <TableCell key={`${attributes.display}_subheader`} align='center' variant='head' colSpan={3}>
              {attributes.display}
            </TableCell>
          </TableRow>
          {selected.map(piece => (
              Object.keys(attributes[piece]).map(attribute => {
                if (attribute !== 'display') {
                  let tableRow;
                  var pieceLabel = attribute === 'Quality' ? attributes[piece]['display'] : ''

                  if (attribute === 'Glyph Quality' && attributes[piece].Glyph === 'None') {
                    tableRow = null;
                  } else {
                    tableRow = (
                      <TableRow key={`${piece}-${attribute}-row`}>
                        <TableCell key={`${piece}-${attribute}-piece`}>{pieceLabel}</TableCell>
                        <TableCell key={`${piece}-${attribute}-attribute`}>{attribute}</TableCell>
                        <TableCell key={`${piece}-${attribute}-input`}>{attributes[piece][attribute]}</TableCell>
                      </TableRow>
                    );
                  }

                  return tableRow;
                } else {
                  return null
                }
              })
          ))}
        </React.Fragment>
      )
    } else {
      returnVal = <React.Fragment></React.Fragment>;
    }

    return returnVal;
  }

  return (
    <Dialog
      TransitionComponent={Transition}
      style={{ overflow: 'auto' }}
      aria-labelledby="Request Confirmation Modal"
      open={review}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="confirmation-dialog-title">
        Request Confirmation
      </DialogTitle>
      <DialogContent
        style={modalStyle}
        dividers
      >
        <div style={{ paddingTop: '2em', paddingBottom: '2em' }}>
          <div className="centered-div">
            <Image src={TheWouldBeGreat} />
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell key="input_field" align='center' colSpan={2}>Input Field</TableCell>
                <TableCell key="user_input">Your Input</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="eso_username">
                <TableCell key="username_label" colSpan={2}>ESO Username</TableCell>
                <TableCell key="username">{esoName}</TableCell>
              </TableRow>
              <TableRow key="gear_level">
                <TableCell key="level_label" colSpan={2}>Gear Level</TableCell>
                <TableCell key="level">{gearLevel}</TableCell>
              </TableRow>
              <TableRow key="payment_option">
                <TableCell key="payment_label" colSpan={2}>Payment</TableCell>
                <TableCell key="payment">{payment}</TableCell>
              </TableRow>
              {pieceRows(armorPieces, armorAttributes)}
              {pieceRows(jewelryPieces, jewelryAttributes)}
              {pieceRows(weaponPieces, weaponAttributes)}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
      <DialogActions>
        <span>
          <Fab
            variant="extended"
            size="medium"
            style={{ backgroundColor: '#27a745' }}
            aria-label="confirm"
            onClick={() => sendMessage(currentState)}
            className={classes.buttonMargin}
          >
            <ThumbsUp className={classes.iconMargin} />
            Confirm
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            aria-label="edit"
            onClick={() => closeReview()}
            className={classes.buttonMargin}
          >
            <EditIcon className={classes.iconMargin} />
            Edit
          </Fab>
        </span>
      </DialogActions>
    </Dialog>
  );
};

Confirmation.propTypes = propTypes;

const mapStateToProps = state => ({
  currentState: state
});

const mapDispatchToProps = dispatch => ({
  sendMessage: currentState => sendRequest(currentState)(dispatch),
  closeReview: () => dispatch({ type: TOGGLE_REVIEW, show: false })
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
