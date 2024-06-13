import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import Image from 'material-ui-image';
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
import TableRow from '@material-ui/core/TableRow';
import { TOGGLE_REVIEW } from '../../store/constants';
import { sendRequest } from '../../store/actions';
import propTypes from './propTypes';
import useStyles from './styles';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

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
    weaponAttributes,
  } = currentState;
  const classes = useStyles();
  const intl = useIntl();

  const pieceRows = (selected, attributes) => {
    let returnVal = null;

    if (selected.length) {
      returnVal = (
        <>
          <TableRow>
            <TableCell className={classes.subheader} key={`${attributes.display}_subheader`} align="center" colSpan={3}>
              {intl.formatMessage({ id: attributes.display })}
            </TableCell>
          </TableRow>
          {selected.map((piece) => (
            Object.keys(attributes[piece]).map((attribute) => {
              if (attribute !== 'display') {
                let tableRow;
                const pieceLabel = attribute === 'Quality' ? attributes[piece].display : '';

                if (attribute === 'Glyph Quality' && attributes[piece].Glyph === 'common.none') {
                  tableRow = null;
                } else {
                  tableRow = (
                    <TableRow key={`${piece}-${attribute}-row`}>
                      <TableCell key={`${piece}-${attribute}-piece`}>
                        {pieceLabel ? intl.formatMessage({ id: pieceLabel }) : undefined}
                      </TableCell>
                      <TableCell key={`${piece}-${attribute}-attribute`}>
                        {attribute ? intl.formatMessage({ id: attribute }) : undefined}
                      </TableCell>
                      <TableCell key={`${piece}-${attribute}-input`}>
                        {
                          attributes[piece][attribute]
                            ? intl.formatMessage({ id: attributes[piece][attribute] })
                            : undefined
                        }
                      </TableCell>
                    </TableRow>
                  );
                }

                return tableRow;
              }
              return null;
            })
          ))}
        </>
      );
    } else {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      returnVal = <></>;
    }

    return returnVal;
  };

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
        {intl.formatMessage({ id: 'confirmation' })}
      </DialogTitle>
      <DialogContent
        dividers
      >
        <div className={classes.dialogContent}>
          <Image
            src="/images/confirmation.png"
            aspectRatio={(16 / 9)}
          />
          <Table>
            <TableBody>
              <TableRow key="eso_username">
                <TableCell key="username_label" colSpan={2}>
                  {intl.formatMessage({ id: 'user.username' })}
                </TableCell>
                <TableCell key="username">{esoName}</TableCell>
              </TableRow>
              <TableRow key="gear_level">
                <TableCell key="level_label" colSpan={2}>
                  {intl.formatMessage({ id: 'confirmation.gearLevel' })}
                </TableCell>
                <TableCell key="level">{gearLevel}</TableCell>
              </TableRow>
              <TableRow key="payment_option">
                <TableCell key="payment_label" colSpan={2}>
                  {intl.formatMessage({ id: 'confirmation.payment' })}
                </TableCell>
                <TableCell key="payment">{intl.formatMessage({ id: payment })}</TableCell>
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
            onClick={() => sendMessage(currentState, intl)}
            className={classes.buttonMargin}
          >
            <ThumbsUp className={classes.iconMargin} />
            {intl.formatMessage({ id: 'confirmation.confirm' })}
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            aria-label="edit"
            onClick={() => closeReview()}
            className={classes.buttonMargin}
          >
            <EditIcon className={classes.iconMargin} />
            {intl.formatMessage({ id: 'confirmation.edit' })}
          </Fab>
        </span>
      </DialogActions>
    </Dialog>
  );
};

Confirmation.propTypes = propTypes;

const mapStateToProps = (state) => ({
  currentState: state,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (currentState, intl) => sendRequest(currentState, intl)(dispatch),
  closeReview: () => dispatch({ type: TOGGLE_REVIEW, show: false }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
