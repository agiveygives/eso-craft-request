import React, { useEffect, useState, useRef } from 'react';
import { Circle } from 'react-shapes';
import { useIntl } from 'react-intl';
import {
  Grid,
  Select,
  Typography,
  FormControl,
} from '@material-ui/core';
import DeepEqual from 'deep-equal';
import { generateSelectOptions } from '../../../utils';
import defaultDropdownValues from '../../../constants/defaultDropdownValues';
import useStyles from '../styles';
import propTypes from './propTypes';

const qualityColors = {
  'quality.normal': '#888888',
  'quality.fine': '#2DC50E',
  'quality.superior': '#3A92FF',
  'quality.epic': '#A02EF7',
  'quality.legendary': '#CCAA1A',
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
  const classes = useStyles();
  const intl = useIntl();

  const [dropdownData, setDropdownData] = useState(data);
  const [selectValue, setSelectValue] = useState(dropdownData.default);

  const prevDropdownData = useRef();

  // Load Data
  useEffect(() => {
    if (!DeepEqual(prevDropdownData.current, dropdownData)) {
      switch (data.key) {
        case 'Quality':
          if (
            gearAttributes.Quality
            && dropdownData.options.find((option) => option.value === gearAttributes.Quality)
          ) {
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
          if (gearAttributes.Trait && dropdownData.options.find((option) => option.value === gearAttributes.Trait)) {
            setDropdownData((prevData) => ({
              ...prevData,
              default: {
                value: gearAttributes.Trait,
                label: gearAttributes.Trait,
                color: '#2DC50E',
                isFixed: true,
              },
            }));
          } else {
            setDropdownData((prevData) => ({
              ...prevData,
              default: defaultDropdownValues.trait,
            }));
          }
          break;
        case 'Set':
          if (gearAttributes.Set && dropdownData.options.find((option) => option.value === gearAttributes.Set)) {
            setDropdownData((prevData) => ({
              ...prevData,
              default: {
                value: gearAttributes.Set,
                label: gearAttributes.Set,
                color: '#2DC50E',
                isFixed: true,
              },
            }));
          } else {
            setDropdownData((prevData) => ({
              ...prevData,
              default: defaultDropdownValues.set,
            }));
          }
          break;
        case 'Glyph':
          if (gearAttributes.Glyph && dropdownData.options.find((option) => option.value === gearAttributes.Glyph)) {
            setDropdownData((prevData) => ({
              ...prevData,
              default: {
                value: gearAttributes.Glyph,
                label: gearAttributes.Glyph,
                color: '#2DC50E',
                isFixed: true,
              },
            }));
          } else {
            setDropdownData((prevData) => ({
              ...prevData,
              default: defaultDropdownValues.glyph,
            }));
          }
          break;
        case 'Glyph Quality':
          if (
            gearAttributes['Glyph Quality']
            && dropdownData.options.find((option) => option.value === gearAttributes['Glyph Quality'])
          ) {
            setDropdownData((prevData) => ({
              ...prevData,
              default: {
                value: gearAttributes['Glyph Quality'],
                label: gearAttributes['Glyph Quality'],
                color: qualityColors[gearAttributes['Glyph Quality']],
                isFixed: true,
              },
            }));
          } else {
            setDropdownData((prevData) => ({
              ...prevData,
              default: defaultDropdownValues.glyphQuality,
            }));
          }
          break;
        case 'Weight':
          if (gearAttributes.Weight && dropdownData.options.find((option) => option.value === gearAttributes.Weight)) {
            setDropdownData((prevData) => ({
              ...prevData,
              default: {
                value: gearAttributes.Weight,
                label: gearAttributes.Weight,
                color: '#2DC50E',
                isFixed: true,
              },
            }));
          } else {
            setDropdownData((prevData) => ({
              ...prevData,
              default: defaultDropdownValues.weight,
            }));
          }
          break;
        case 'Style':
          if (gearAttributes.Style && dropdownData.options.find((option) => option.value === gearAttributes.Style)) {
            setDropdownData((prevData) => ({
              ...prevData,
              default: {
                value: gearAttributes.Style,
                label: gearAttributes.Style,
                color: '#2DC50E',
                isFixed: true,
              },
            }));
          } else {
            setDropdownData((prevData) => ({
              ...prevData,
              default: defaultDropdownValues.style,
            }));
          }
          break;
        case 'Weapon':
          if (gearAttributes.Weapon && dropdownData.options.find((option) => option.value === gearAttributes.Weapon)) {
            setDropdownData((prevData) => ({
              ...prevData,
              default: {
                value: gearAttributes.Weapon,
                label: gearAttributes.Weapon,
                color: '#2DC50E',
                isFixed: true,
              },
            }));
          } else {
            setDropdownData((prevData) => ({
              ...prevData,
              default: defaultDropdownValues.weapon,
            }));
          }
          break;
        default:
          setDropdownData((prevData) => ({
            ...prevData,
            default: {
              value: null,
              label: 'Select',
            },
          }));
          break;
      }
    }

    prevDropdownData.current = dropdownData;
  }, [data, gearAttributes, dropdownData]);

  useEffect(() => {
    setDropdownData(data);
  }, [data]);

  useEffect(() => {
    const splitKey = dropdownData.key.split(' ');
    splitKey[0] = splitKey[0].toLowerCase();

    if (
      selectValue.value !== defaultDropdownValues[splitKey.join('')].value
      && !dropdownData.options.find((option) => option.value === selectValue.value)
    ) {
      updateAttributes(piece, dropdownData.key);
      setSelectValue(defaultDropdownValues[splitKey.join('')]);
    }
  },
  [dropdownData, selectValue, updateAttributes, piece]);

  return (
    <Grid key={dropdownData.key} item xs={gridSize} className="centered-div">
      <FormControl disabled={glyphVal === 'common.none' && dropdownData.key === 'Glyph Quality'}>
        <Select
          className={classes.select}
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
            (_, child) => {
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

Dropdown.defaultProps = {
  shieldOptions: undefined,
};

Dropdown.propTypes = propTypes;

export default Dropdown;
