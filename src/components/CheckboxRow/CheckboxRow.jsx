import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  FormControl, FormGroup, FormControlLabel, Typography,
} from '@material-ui/core';

import { UPDATE_ARMOR_PIECES, UPDATE_JEWELRY_PIECES, UPDATE_WEAPON_PIECES } from '../../store/constants';
import ColoredSwitch from '../ColoredSwitch';
import { armorBoxes, jewelryBoxes, weaponBoxes } from './utils';
import useStyles from './styles';
import propTypes from './propTypes';

const CheckboxRow = ({ id, selectedPieces, updatePieces }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [checkboxes, setCheckboxes] = useState([]);
  const [sectionHeader, setSectionHeader] = useState('');

  useEffect(() => {
    switch (id) {
      case 'armor':
        setCheckboxes(armorBoxes(intl));
        setSectionHeader(intl.formatMessage({ id: 'gear.armor.sectionHeader' }));
        break;
      case 'jewelry':
        setCheckboxes(jewelryBoxes(intl));
        setSectionHeader(intl.formatMessage({ id: 'gear.jewelry.sectionHeader' }));
        break;
      case 'weapon':
        setCheckboxes(weaponBoxes(intl));
        setSectionHeader(intl.formatMessage({ id: 'gear.weapon.sectionHeader' }));
        break;
      default:
        setCheckboxes([]);
        setSectionHeader('');
        break;
    }
  }, [id, intl]);

  const createCheckbox = (box) => (
    <FormControlLabel
      key={box.id}
      value={box.id}
      control={(
        <ColoredSwitch
          checked={selectedPieces.includes(box.id)}
          color="primary"
          onChange={(event, checked) => {
            if (checked && !selectedPieces.includes(event.target.value)) {
              updatePieces([...selectedPieces, event.target.value]);
            } else if (!checked && selectedPieces.includes(event.target.value)) {
              updatePieces(selectedPieces.filter((word) => word !== event.target.value));
            }
          }}
        />
      )}
      label={box.label}
      labelPlacement="top"
    />
  );

  return (
    <span className={classes.spacer}>
      <div className="centered-div">
        <Typography variant="h5" gutterBottom>
          {sectionHeader}
        </Typography>
      </div>
      <div className="centered-div">
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            {checkboxes.map(createCheckbox)}
          </FormGroup>
        </FormControl>
      </div>
    </span>
  );
};

CheckboxRow.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.id) {
    case 'armor':
      return { selectedPieces: state.armorPieces };

    case 'jewelry':
      return { selectedPieces: state.jewelryPieces };

    case 'weapon':
      return { selectedPieces: state.weaponPieces };

    default:
      return { selectedPieces: [] };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  switch (ownProps.id) {
    case 'armor':
      return {
        updatePieces: (pieces) => dispatch({ type: UPDATE_ARMOR_PIECES, pieces }),
      };

    case 'jewelry':
      return {
        updatePieces: (pieces) => dispatch({ type: UPDATE_JEWELRY_PIECES, pieces }),
      };

    case 'weapon':
      return {
        updatePieces: (pieces) => dispatch({ type: UPDATE_WEAPON_PIECES, pieces }),
      };

    default:
      return {
        updatePieces: (pieces) => console.log(`ERROR: failed to update to ${pieces}`),
      };
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxRow);
