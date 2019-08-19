import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spacer from 'terra-spacer';
import Text from 'terra-text';
import ButtonGroup from 'terra-button-group';
import { UPDATE_ARMOR_PIECES, UPDATE_JEWELRY_PIECES, UPDATE_WEAPON_PIECES } from '../../store/constants';

const propTypes = {
  id: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,

  // from redux
  selectedPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
  updatePieces: PropTypes.func.isRequired
};

const CheckboxRow = ({ id, selectedPieces, updatePieces }) => {
  const armorBoxes = [
    { id: 'head', label: 'Head' },
    { id: 'shoulder', label: 'Shoulder' },
    { id: 'chest', label: 'Chest' },
    { id: 'legs', label: 'Legs' },
    { id: 'waist', label: 'Waist' },
    { id: 'hands', label: 'Hands' },
    { id: 'feet', label: 'Feet' }
  ]
  const jewelryBoxes = [
    { id: 'necklace', label: 'Necklace' },
    { id: 'ring1', label: 'Ring' },
    { id: 'ring2', label: 'Ring' }
  ]
  const weaponBoxes = [
    { id: 'primary1', label: 'Primary' },
    { id: 'secondary1', label: 'Secondary' },
    { id: 'primary2', label: 'Primary' },
    { id: 'secondary2', label: 'Secondary' }
  ]
  let checkboxes;

  switch(id) {
    case 'armor':
      checkboxes = armorBoxes;
      break;
    case 'jewelry':
      checkboxes = jewelryBoxes;
      break;
    case 'weapon':
      checkboxes = weaponBoxes;
      break;
    default:
      checkboxes = [];
      break;
  }

  function createCheckbox(box) {
    const style = {
      width: '7.5em',
      borderColor: 'black'
    }
    let buttonStyle;
    let label;

    if (selectedPieces.includes(box.id)) {
      label = `- ${box.label}`;
      buttonStyle = { ...style, backgroundColor: '#dc3545' }
    } else {
      label = `+ ${box.label}`;
      buttonStyle = { ...style, backgroundColor: '#27a745' }
    }

    return (
      <ButtonGroup.Button
        style={buttonStyle}
        text={label}
        key={box.id}
      />
    );
  }

  return (
    <Spacer margin='large+1'>
      <div className="centered-div">
        <Text fontSize={18} weight={700}>
          Select Your {id.charAt(0).toUpperCase() + id.slice(1)}
        </Text>
      </div>
      <div className="centered-div">
        <ButtonGroup
          id="button-group-multi-select"
          onChange={(event, key) => {
            event.preventDefault();
            updatePieces(ButtonGroup.Utils.handleMultiSelectedKeys(selectedPieces, key))
          }}
          selectedKeys={selectedPieces}
        >
          {checkboxes.map(createCheckbox)}
        </ButtonGroup >
      </div>
    </Spacer>
  )
};

CheckboxRow.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  switch(ownProps.id) {
    case 'armor':
      return { selectedPieces: state.armorPieces };

    case 'jewelry':
      return { selectedPieces: state.jewelryPieces };

    case 'weapon':
      return { selectedPieces: state.weaponPieces };

    default:
      return { selectedPieces: [] }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  switch(ownProps.id) {
    case 'armor':
      return {
        updatePieces: pieces => dispatch({ type: UPDATE_ARMOR_PIECES, pieces })
      };

    case 'jewelry':
      return {
        updatePieces: pieces => dispatch({ type: UPDATE_JEWELRY_PIECES, pieces })
      };

    case 'weapon':
      return {
        updatePieces: pieces => dispatch({ type: UPDATE_WEAPON_PIECES, pieces })
      };

    default:
      return {
        updatePieces: pieces => console.log(`ERROR: failed to update to ${pieces}`)
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxRow);
