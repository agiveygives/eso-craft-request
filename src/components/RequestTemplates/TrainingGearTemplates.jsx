import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

// Material-UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles } from '@material-ui/core/styles';

import TrainingGear from '../../constants/trainingGear'
import * as Constants from '../../store/constants';

const styles = createStyles({
  select: {
    background: '#e8e9ea',
    borderRadius: 3,
    color: 'black',
    padding: '0.2rem',
    minWidth: '7rem'
  },
  wrapper: {
    paddingLeft: '0.5rem'
  }
});

const TrainingGearTemplates = ({
  resetRequest,
  updateArmorPieces,
  updateArmorAttributes,
  updateJewelryPieces,
  updateJewelryAttributes,
  updateWeaponPieces,
  updateWeaponAttributes
}) => {
  const [template, setTemplate] = React.useState('none')

  const templateSelectionHandler = (data, child) => {
    setTemplate(data.target.value)
    if(data.target.value === 'none') {
      resetRequest()
      return
    }

    let gearStateAttributes = child.props.optiondata

    updateArmorPieces(gearStateAttributes.armorPieces)
    Object.keys(gearStateAttributes.armorAttributes).forEach(
      piece => {
        if (gearStateAttributes.armorPieces.includes(piece)) {
          Object.keys(gearStateAttributes.armorAttributes[piece]).forEach(
            attribute => updateArmorAttributes(
              piece,
              attribute,
              gearStateAttributes.armorAttributes[piece][attribute].value,
              gearStateAttributes.armorAttributes[piece][attribute].stone,
              gearStateAttributes.armorAttributes[piece][attribute].essenceRune,
              gearStateAttributes.armorAttributes[piece][attribute].potency
            )
          )
        }
      }
    )
    updateJewelryPieces(gearStateAttributes.jewelryPieces)
    Object.keys(gearStateAttributes.jewelryAttributes).forEach(
      piece => {
        if (gearStateAttributes.jewelryPieces.includes(piece)) {
          Object.keys(gearStateAttributes.jewelryAttributes[piece]).forEach(
            attribute => updateJewelryAttributes(
              piece,
              attribute,
              gearStateAttributes.jewelryAttributes[piece][attribute].value,
              gearStateAttributes.jewelryAttributes[piece][attribute].stone,
              gearStateAttributes.jewelryAttributes[piece][attribute].essenceRune,
              gearStateAttributes.jewelryAttributes[piece][attribute].potency
            )
          )
        }
      }
    )
    updateWeaponPieces(gearStateAttributes.weaponPieces)
    Object.keys(gearStateAttributes.weaponAttributes).forEach(
      piece => {
        if (gearStateAttributes.weaponPieces.includes(piece)) {
          Object.keys(gearStateAttributes.weaponAttributes[piece]).forEach(
            attribute => updateWeaponAttributes(
              piece,
              attribute,
              gearStateAttributes.weaponAttributes[piece][attribute].value,
              gearStateAttributes.weaponAttributes[piece][attribute].stone,
              gearStateAttributes.weaponAttributes[piece][attribute].essenceRune,
              gearStateAttributes.weaponAttributes[piece][attribute].potency
            )
          )
        }
      }
    )
  }

  return (
    <span className="centered-div">
      <Typography variant='h6'>Training Gear Templates:</Typography>
      <span style={styles.wrapper}>
        <Select
          style={styles.select}
          value={template}
          displayEmpty
          onChange={templateSelectionHandler}
        >
          {
            Object.keys(TrainingGear).map(
              key => (
                <MenuItem key={key} optiondata={TrainingGear[key].gearStateAttributes} value={key}>
                  {TrainingGear[key].display}
                </MenuItem>
              )
            )
          }
        </Select>
      </span>
    </span>
  )
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  resetRequest: () => dispatch({ type: Constants.RESTART }),
  updateArmorPieces: pieces => dispatch(
    { type: Constants.UPDATE_ARMOR_PIECES, pieces }
  ),
  updateJewelryPieces: pieces => dispatch(
    { type: Constants.UPDATE_JEWELRY_PIECES, pieces }
  ),
  updateWeaponPieces: pieces => dispatch(
    { type: Constants.UPDATE_WEAPON_PIECES, pieces }
  ),
  updateArmorAttributes: (piece, attribute, value, stone, essenceRune, potency) => {
    dispatch({ type: Constants.UPDATE_ARMOR, piece, attribute, value });
    dispatch({ type: Constants.UPDATE_ARMOR_MATS, piece, attribute, value, stone, essenceRune, potency  })
  },
  updateJewelryAttributes: (piece, attribute, value, stone, essenceRune, potency) => {
    dispatch({ type: Constants.UPDATE_JEWELRY, piece, attribute, value });
    dispatch({ type: Constants.UPDATE_JEWELRY_MATS, piece, attribute, value, stone, essenceRune, potency });
  },
  updateWeaponAttributes: (piece, attribute, value, stone, essenceRune, potency) => {
    dispatch({ type: Constants.UPDATE_WEAPONS, piece, attribute, value });
    dispatch({ type: Constants.UPDATE_WEAPON_MATS, piece, attribute, value, stone, essenceRune, potency  });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingGearTemplates);