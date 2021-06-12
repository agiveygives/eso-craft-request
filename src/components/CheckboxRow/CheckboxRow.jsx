import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  FormControl, FormGroup, FormControlLabel, Switch, Typography,
} from '@material-ui/core';

import { green } from '@material-ui/core/colors';
import { UPDATE_ARMOR_PIECES, UPDATE_JEWELRY_PIECES, UPDATE_WEAPON_PIECES } from '../../store/constants';

const propTypes = {
  id: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,

  // from redux
  selectedPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
  updatePieces: PropTypes.func.isRequired,
};

const ColoredSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: green[500],
    },
    '&$checked + $track': {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles(() => ({
  spacer: {
    margin: '1rem',
  },
}));

const CheckboxRow = ({ id, selectedPieces, updatePieces }) => {
  const classes = useStyles();
  const intl = useIntl();

  const armorBoxes = [
    { id: 'head', label: intl.formatMessage({ id: 'gear.armor.head' }) },
    { id: 'shoulder', label: intl.formatMessage({ id: 'gear.armor.shoulder' }) },
    { id: 'chest', label: intl.formatMessage({ id: 'gear.armor.chest' }) },
    { id: 'legs', label: intl.formatMessage({ id: 'gear.armor.legs' }) },
    { id: 'waist', label: intl.formatMessage({ id: 'gear.armor.waist' }) },
    { id: 'hands', label: intl.formatMessage({ id: 'gear.armor.hands' }) },
    { id: 'feet', label: intl.formatMessage({ id: 'gear.armor.feet' }) },
  ];
  const jewelryBoxes = [
    { id: 'necklace', label: intl.formatMessage({ id: 'gear.jewelry.necklace' }) },
    { id: 'ring1', label: intl.formatMessage({ id: 'gear.jewelry.ring' }) },
    { id: 'ring2', label: intl.formatMessage({ id: 'gear.jewelry.ring' }) },
  ];
  const weaponBoxes = [
    { id: 'primary1', label: intl.formatMessage({ id: 'gear.weapon.primary' }) },
    { id: 'secondary1', label: intl.formatMessage({ id: 'gear.weapon.secondary' }) },
    { id: 'primary2', label: intl.formatMessage({ id: 'gear.weapon.primary' }) },
    { id: 'secondary2', label: intl.formatMessage({ id: 'gear.weapon.secondary' }) },
  ];
  let checkboxes;
  let sectionHeader;

  switch (id) {
    case 'armor':
      checkboxes = armorBoxes;
      sectionHeader = intl.formatMessage({ id: 'gear.armor.sectionHeader' });
      break;
    case 'jewelry':
      checkboxes = jewelryBoxes;
      sectionHeader = intl.formatMessage({ id: 'gear.jewelry.sectionHeader' });
      break;
    case 'weapon':
      checkboxes = weaponBoxes;
      sectionHeader = intl.formatMessage({ id: 'gear.weapon.sectionHeader' });
      break;
    default:
      checkboxes = [];
      sectionHeader = '';
      break;
  }

  function createCheckbox(box) {
    return (
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
  }

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
