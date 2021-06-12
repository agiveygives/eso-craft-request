import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-shapes';
import { useIntl } from 'react-intl';
import {
  Grid,
  Select,
  Typography,
  FormControl,
} from '@material-ui/core';
import { generateSelectOptions } from '../../utils';
import defaultDropdownValues from '../../constants/defaultDropdownValues';
import GearAttributesShape from '../../propShapes/gearAttributesShape';

const qualityColors = {
  'quality.normal': '#888888',
  'quality.fine': '#2DC50E',
  'quality.superior': '#3A92FF',
  'quality.epic': '#A02EF7',
  'quality.legendary': '#CCAA1A',
};

const propTypes = {
  piece: PropTypes.string.isRequired,
  data: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({})),
    default: PropTypes.shape({
      value: '',
      label: PropTypes.oneOf([
        'Glyph',
        'Glyph Quality',
        'Trait',
        'Quality',
        'Set',
        'Style',
        'Weapon',
        'Weight',
      ]).isRequired,
      isFixed: true,
    }),
    key: PropTypes.string,
  }).isRequired,
  gridSize: PropTypes.number.isRequired,
  gearAttributes: GearAttributesShape.isRequired,
  updateAttributes: PropTypes.func.isRequired,
  glyphVal: PropTypes.string.isRequired,
  setAllOptions: PropTypes.func.isRequired,
  allPieceOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shieldOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const Dropdown = ({
  piece,
  data,
  gridSize,
  gearAttributes,
  updateAttributes,
  glyphVal,
  setAllOptions,
  allPieceOptions,
  shieldOptions,
}) => {
  const intl = useIntl();

  const [dropdownData, setDropdownData] = useState(data);

  // Load Data
  switch (dropdownData.key) {
    case 'Quality':
      if (gearAttributes.Quality) {
        setDropdownData((prevData) => ({
          ...prevData,
          default: {
            value: gearAttributes.Quality,
            label: gearAttributes.Quality,
            color: qualityColors[gearAttributes.Quality],
            isFixed: true,
          },
        }));
      } else {
        setDropdownData((prevData) => ({
          ...prevData,
          default: defaultDropdownValues.quality,
        }));
      }
      break;
    case 'Trait':
      if (gearAttributes.Trait) {
        dropdownData.default = {
          value: gearAttributes.Trait,
          label: gearAttributes.Trait,
          color: '#2DC50E',
          isFixed: true,
        };
      } else {
        dropdownData.default = defaultDropdownValues.trait;
      }
      break;
    case 'Set':
      if (gearAttributes.Set) {
        dropdownData.default = {
          value: gearAttributes.Set,
          label: gearAttributes.Set,
          color: '#2DC50E',
          isFixed: true,
        };
      } else {
        dropdownData.default = defaultDropdownValues.set;
      }
      break;
    case 'Glyph':
      if (gearAttributes.Glyph) {
        dropdownData.default = {
          value: gearAttributes.Glyph,
          label: gearAttributes.Glyph,
          color: '#2DC50E',
          isFixed: true,
        };
      } else {
        dropdownData.default = defaultDropdownValues.glyph;
      }
      break;
    case 'Glyph Quality':
      if (gearAttributes['Glyph Quality']) {
        dropdownData.default = {
          value: gearAttributes['Glyph Quality'],
          label: gearAttributes['Glyph Quality'],
          color: qualityColors[gearAttributes['Glyph Quality']],
          isFixed: true,
        };
      } else {
        dropdownData.default = defaultDropdownValues.glyphQuality;
      }
      break;
    case 'Weight':
      if (gearAttributes.Weight) {
        dropdownData.default = {
          value: gearAttributes.Weight,
          label: gearAttributes.Weight,
          color: '#2DC50E',
          isFixed: true,
        };
      } else {
        dropdownData.default = defaultDropdownValues.weight;
      }
      break;
    case 'Style':
      if (gearAttributes.Style) {
        dropdownData.default = {
          value: gearAttributes.Style,
          label: gearAttributes.Style,
          color: '#2DC50E',
          isFixed: true,
        };
      } else {
        dropdownData.default = defaultDropdownValues.style;
      }
      break;
    case 'Weapon':
      if (gearAttributes.Weapon) {
        dropdownData.default = {
          value: gearAttributes.Weapon,
          label: gearAttributes.Weapon,
          color: '#2DC50E',
          isFixed: true,
        };
      } else {
        dropdownData.default = defaultDropdownValues.weapon;
      }
      break;
    default:
      dropdownData.default = {
        value: null,
        label: 'Select',
      };
      break;
  }

  const [selectValue,
    setSelectValue] = React.useState(dropdownData.default);

  React.useEffect(() => {
    const splitKey = dropdownData.key.split(' ');
    splitKey[0] = splitKey[0].toLowerCase();

    if (
      selectValue.value !== defaultDropdownValues[splitKey.join('')].value
      && !dropdownData.options.find((option) => option.value === selectValue.value)
    ) {
      updateAttributes(piece,
        dropdownData.key);
      setSelectValue(defaultDropdownValues[splitKey.join('')]);
    }
  },
  [dropdownData, selectValue, updateAttributes, piece]);

  return (
    <Grid key={dropdownData.key} item xs={gridSize} className="centered-div">
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
              <>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <Circle r={5} fill={{ color: selectValue.color }} />
                  <Typography
                    variant="body1"
                    style={{
                      padding: '0.5rem',
                      minWidth: '5rem',
                    }}
                  >
                    {intl.formatMessage({ id: selectValue.label })}
                  </Typography>
                </span>
              </>
            )
          }
          onChange={
            (_,
              child) => {
              setSelectValue(child.props.optiondata);
              updateAttributes(
                piece,
                child.props.piecekey,
                child.props.value,
                child.props.optiondata.stone,
                child.props.optiondata.essenceRune,
                child.props.optiondata.potency,
              );
              if (child.props.piecekey === 'Weapon') {
                if (child.props.value === 'gear.weapon.shield') {
                  setAllOptions(shieldOptions);
                } else {
                  setAllOptions(allPieceOptions);
                }
              }
            }
          }
        >
          {
            dropdownData.options.map((option) => generateSelectOptions(
              option.value,
              dropdownData.key,
              option,
              intl,
            ))
          }
        </Select>
      </FormControl>
    </Grid>
  );
};

Dropdown.propTypes = propTypes;

export default Dropdown;
