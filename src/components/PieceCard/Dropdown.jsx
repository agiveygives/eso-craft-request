import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-shapes';
import { useIntl } from 'react-intl';
import { Grid, Select, Typography, FormControl } from '@material-ui/core';
import Utils from '../../utils';

const qualityColors = {
  "quality.normal": '#888888',
  "quality.fine": '#2DC50E',
  "quality.superior": '#3A92FF',
  "quality.epic": '#A02EF7',
  "quality.legendary": '#CCAA1A'
};

const propTypes = {
  piece: PropTypes.string.isRequired,
  dropdownData: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({})),
    default: PropTypes.shape({}),
    key: PropTypes.string,
  }),
  defaultValues: PropTypes.shape({
    glyph: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Glyph']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
    glyphQuality: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Glyph Quality']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
    trait: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Trait']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
    quality: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Quality']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
    set: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Set']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
    style: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Style']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
    weapon: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Weapon']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
    weight: PropTypes.shape({ value: PropTypes.string, label: PropTypes.oneOf(['Weight']), color: PropTypes.oneOf(['#FF5630']), isFixed: PropTypes.oneOf([true]) }),
  }),
  gridSize: PropTypes.number,
  gearAttributes: PropTypes.shape({}),
  updateAttributes: PropTypes.func,
  glyphVal: PropTypes.string,
  setAllOptions: PropTypes.func,
  allPieceOptions: PropTypes.arrayOf(PropTypes.shape({})),
  shieldOptions: PropTypes.arrayOf(PropTypes.shape({}))
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
  const intl = useIntl();

  // Load Data
  switch (dropdownData.key) {
    case 'Quality':
      if (gearAttributes.Quality) {
        dropdownData.default = {
          value: gearAttributes.Quality,
          label: gearAttributes.Quality,
          color: qualityColors[gearAttributes.Quality],
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
          color: qualityColors[gearAttributes['Glyph Quality']],
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
      <FormControl disabled={glyphVal === 'common.none' && dropdownData.key === 'Glyph Quality'}>
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
                  <Typography variant='body1' style={{ padding: '0.5rem', minWidth: '5rem' }}>
                    {intl.formatMessage({  id: selectValue.label })}
                  </Typography>
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
              child.props.piecekey === 'Weapon' && child.props.value === 'gear.weapon.shield'
                ? setAllOptions(shieldOptions)
                : setAllOptions(allPieceOptions)
            }
          }
        >
          {dropdownData.options.map(option => Utils.generateSelectOptions(option.value, dropdownData.key, option, intl))}
        </Select>
      </FormControl>
    </Grid>
  );
};

Dropdown.propTypes = propTypes;

export default Dropdown;
