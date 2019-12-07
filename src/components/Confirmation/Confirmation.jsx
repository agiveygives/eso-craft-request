import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AbstractModal from 'terra-abstract-modal';
import { TOGGLE_REVIEW } from '../../store/constants';
import ContentContainer from 'terra-content-container';
import Image from 'terra-image';
import Arrange from 'terra-arrange';
import Spacer from 'terra-spacer';
import Fab from '@material-ui/core/Fab';
import Table from 'terra-table/lib/Table';
import { sendRequest } from '../../store/actions';
import TheWouldBeGreat from '../../images/confirmation.png';
import EditIcon from '@material-ui/icons/Edit';
import ThumbsUp from '@material-ui/icons/ThumbUp';

const propTypes = {
  // from redux
  currentState: PropTypes.shape({}).isRequired,
  sendMessage: PropTypes.func.isRequired,
  closeReview: PropTypes.func.isRequired
};

const modalStyle = {
  backgroundColor: '#e0e0e0',
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
          <Table.Subheader key={`${attributes.display}_subheader`} content={attributes.display} colSpan={3} />
          {selected.map(piece => (
              Object.keys(attributes[piece]).map(attribute => {
                if (attribute !== 'display') {
                  let tableRow;
                  var pieceLabel = attribute === 'Quality' ? attributes[piece]['display'] : ''

                  if (attribute === 'Glyph Quality' && attributes[piece].Glyph === 'None') {
                    tableRow = null;
                  } else {
                    tableRow = (
                      <Table.Row key={`${piece}-${attribute}-row`}>
                        <Table.Cell key={`${piece}-${attribute}-piece`} content={pieceLabel} />
                        <Table.Cell key={`${piece}-${attribute}-attribute`} content={attribute} />
                        <Table.Cell key={`${piece}-${attribute}-input`} content={attributes[piece][attribute]} />
                      </Table.Row>
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
    <AbstractModal
      style={{ overflow: 'auto' }}
      ariaLabel="Confirmation"
      isOpen={review}
      closeOnOutsideClick={false}
      onRequestClose={() => {}}
    >
      <ContentContainer
        style={modalStyle}
        header={
          <div className="centered-div">
            <Image src={TheWouldBeGreat} />
          </div>
        }
        footer={
          <Arrange
            fill={
              <div className='centered-div'>
                <Spacer padding='medium'>
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
                </Spacer>
                <Spacer padding='medium'>
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
                </Spacer>
              </div>
            }
          />
        }
      >
        <div style={{ paddingTop: '2em', paddingBottom: '2em' }}>
          <Table isStriped>
            <Table.Header>
              <Table.HeaderCell content="Input Field" key="input_field" colSpan={2} />
              <Table.HeaderCell content="Your Input" key="user_input" />
            </Table.Header>
            <Table.Rows>
              <Table.Row key="eso_username">
                <Table.Cell content="ESO Username" key="username_label" colSpan={2} />
                <Table.Cell content={esoName} key="username" />
              </Table.Row>
              <Table.Row key="gear_level">
                <Table.Cell content="Gear Level" key="level_label" colSpan={2} />
                <Table.Cell content={gearLevel} key="level" />
              </Table.Row>
              <Table.Row key="payment_option">
                <Table.Cell content="Payment" key="payment_label" colSpan={2} />
                <Table.Cell content={payment} key="payment" />
              </Table.Row>
              {pieceRows(armorPieces, armorAttributes)}
              {pieceRows(jewelryPieces, jewelryAttributes)}
              {pieceRows(weaponPieces, weaponAttributes)}
            </Table.Rows>
          </Table>
        </div>
      </ContentContainer>
    </AbstractModal>
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
