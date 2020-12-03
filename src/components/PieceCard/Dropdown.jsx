import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-shapes';
import { Grid, Select, Typography, FormControl } from '@material-ui/core';
import Utils from '../../utils';

const qualityColors = {
  normal: '#888888',
  fine: '#2DC50E',
  superior: '#3A92FF',
  epic: '#A02EF7',
  legendary: '#CCAA1A'
};

const propTypes = {
  piece: PropTypes.string.isRequired,
  dropdownData: PropTypes.shape({
    options: PropTypes.shape({}),
    default: PropTypes.shape({}),
    key: PropTypes.string,
  }),
  defaultValues: PropTypes.shape({
    glyph: PropTypes.shape({ value: '', label: 'Glyph', color: '#FF5630', isFixed: true }),
    glyphQuality: PropTypes.shape({ value: '', label: 'Glyph Quality', color: '#FF5630', isFixed: true }),
    trait: PropTypes.shape({ value: '', label: 'Trait', color: '#FF5630', isFixed: true }),
    quality: PropTypes.shape({ value: '', label: 'Quality', color: '#FF5630', isFixed: true }),
    set: PropTypes.shape({ value: '', label: 'Set', color: '#FF5630', isFixed: true }),
    style: PropTypes.shape({ value: '', label: 'Style', color: '#FF5630', isFixed: true }),
    weapon: PropTypes.shape({ value: '', label: 'Weapon', color: '#FF5630', isFixed: true }),
    weight: PropTypes.shape({ value: '', label: 'Weight', color: '#FF5630', isFixed: true }),
  }),
  gridSize: PropTypes.number,
  gearAttributes: PropTypes.shape(),
  updateAttributes: PropTypes.func,
  glyphVal: PropTypes.string,
  setAllOptions: PropTypes.func,
  allPieceOptions: PropTypes.shape(),
  shieldOptions: PropTypes.shape()
};

const Dropdown = ({
  piece,
  dropdownData,
  defaultValues,
  gridSize,
  gearAttributes,
  updateAttributes,
  glyphVal,
  setAllOptions,
  allPieceOptions,
  shieldOptions,
}) => {
  // Load Data
  switch (dropdownData.key) {
    case 'Quality':
      if (gearAttributes.Quality) {
        dropdownData.default = {
          value: gearAttributes.Quality,
          label: gearAttributes.Quality,
          color: qualityColors[gearAttributes.Quality.toLowerCase()],
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.quality;
      }
      break;
    case 'Trait':
      if (gearAttributes.Trait) {
        dropdownData.default = {
          value: gearAttributes.Trait,
          label: gearAttributes.Trait,
          color: '#2DC50E',
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.trait;
      }
      break;
    case 'Set':
      if (gearAttributes.Set) {
        dropdownData.default = {
          value: gearAttributes.Set,
          label: gearAttributes.Set,
          color: '#2DC50E',
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.set;
      }
      break;
    case 'Glyph':
      if (gearAttributes.Glyph) {
        dropdownData.default = {
          value: gearAttributes.Glyph,
          label: gearAttributes.Glyph,
          color: '#2DC50E',
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.glyph;
      }
      break;
    case 'Glyph Quality':
      if (gearAttributes['Glyph Quality']) {
        dropdownData.default = {
          value: gearAttributes['Glyph Quality'],
          label: gearAttributes['Glyph Quality'],
          color: '#2DC50E',
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.glyphQuality;
      }
      break;
    case 'Weight':
      if (gearAttributes.Weight) {
        dropdownData.default = {
          value: gearAttributes.Weight,
          label: gearAttributes.Weight,
          color: '#2DC50E',
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.weight;
      }
      break;
    case 'Style':
      if (gearAttributes.Style) {
        dropdownData.default = {
          value: gearAttributes.Style,
          label: gearAttributes.Style,
          color: '#2DC50E',
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.style;
      }
      break;
    case 'Weapon':
      if (gearAttributes.Weapon) {
        dropdownData.default = {
          value: gearAttributes.Weapon,
          label: gearAttributes.Weapon,
          color: '#2DC50E',
          isFixed: true
        }
      } else {
        dropdownData.default = defaultValues.weapon;
      }
      break;
    default:
      dropdownData.default = { value: null, label: 'Select' }
      break;
  }

  const [selectValue, setSelectValue] = React.useState(dropdownData.default)

  return (
    <Grid key={dropdownData.key} item xs={gridSize} className='centered-div'>
      <FormControl disabled={glyphVal === 'None' && dropdownData.key === 'Glyph Quality'}>
        <Select
          style={{ minWidth: '10rem' }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '30rem',
              },
            },
          }}
          displayEmpty
          value={selectValue.value}
          renderValue={
            () => (
              <React.Fragment>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Circle r={5} fill={{color: selectValue.color}} />
                  <Typography variant='body1' style={{ padding: '0.5rem', minWidth: '5rem' }}>{selectValue.label}</Typography>
                </span>
              </React.Fragment>
            )
          }
          onChange={
            (_, child) => {
              setSelectValue(child.props.optiondata)
              updateAttributes(
                piece,
                child.props.piecekey,
                child.props.value,
                child.props.optiondata.stone,
                child.props.optiondata.essenceRune,
                child.props.optiondata.potency
              )
              child.props.piecekey === 'Weapon' && child.props.value === 'Shield'
                ? setAllOptions(shieldOptions)
                : setAllOptions(allPieceOptions)
            }
          }
        >
          {dropdownData.options.map(option => Utils.generateSelectOptions(option.value, dropdownData.key, option))}
        </Select>
      </FormControl>
    </Grid>
  );
};

Dropdown.propTypes = propTypes;

export default Dropdown;
