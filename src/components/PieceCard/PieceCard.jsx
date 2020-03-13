import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Grid, Select, Typography, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Circle } from 'react-shapes'

// constants and Utils
import Utils from '../../utils';
import { qualityOptions } from '../../constants/qualityOptions';
import { armorWeights, armorTraits, armorGlyphs } from '../../constants/armorOptions';
import { jewelryTraits, jewelryGlyphs } from '../../constants/jewelryOptions';
import { primaryWeapons, secondaryWeapons, weaponTraits, weaponGlyphs } from '../../constants/weaponOptions';
import SetOptions from '../../constants/setOptions';
import StyleOptions from '../../constants/styleOptions';
import { UPDATE_ARMOR, UPDATE_JEWELRY, UPDATE_WEAPONS, UPDATE_ARMOR_MATS, UPDATE_WEAPON_MATS, UPDATE_JEWELRY_MATS } from '../../store/constants';

const propTypes = {
  group: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,
  piece: PropTypes.string.isRequired,

  // from redux
  gearAttributes: PropTypes.shape({}).isRequired,
  updateAttributes: PropTypes.func.isRequired,
  glyphVal: PropTypes.string
};

const useStyles = makeStyles({
  card: {
    color: 'black',
    backgroundColor: '#e8e9ea',
    overflow: 'visible'
  },
  content: {
    width: "30em"
  },
  centered: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardPadding: {
    padding: '2rem'
  }
});

const defaultValues = {
  glyph: { value: '', label: 'Glyph', color: '#FF5630', isFixed: true },
  glyphQuality: { value: '', label: 'Glyph Quality', color: '#FF5630', isFixed: true },
  trait: { value: '', label: 'Trait', color: '#FF5630', isFixed: true },
  quality: { value: '', label: 'Quality', color: '#FF5630', isFixed: true },
  set: { value: '', label: 'Set', color: '#FF5630', isFixed: true },
  style: { value: '', label: 'Style', color: '#FF5630', isFixed: true },
  weapon: { value: '', label: 'Weapon', color: '#FF5630', isFixed: true },
  weight: { value: '', label: 'Weight', color: '#FF5630', isFixed: true }
}

const qualityColors = {
  normal: '#888888',
  fine: '#2DC50E',
  superior: '#3A92FF',
  epic: '#A02EF7',
  legendary: '#CCAA1A'
}

const PieceCard = ({
  group,
  piece,
  gearAttributes,
  updateAttributes,
  glyphVal
}) => {
  const classes = useStyles();
  let allOptions;

  switch (group) {
    case 'armor':
      allOptions = [
        { options: armorWeights, default: defaultValues.weight, key: 'Weight' },
        { options: armorTraits, default: defaultValues.trait, key: 'Trait' },
        { options: armorGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: qualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: StyleOptions, default: defaultValues.style, key: 'Style' }
      ];
      break;
    case 'jewelry':
      allOptions = [
        { options: jewelryTraits, default: defaultValues.trait, key: 'Trait' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: jewelryGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: qualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' }
      ];
      break;
    case 'weapon':
      let weapons = piece.includes('primary') ? primaryWeapons : secondaryWeapons;
      allOptions = [
        { options: weapons, default: defaultValues.weapon, key: 'Weapon' },
        { options: weaponTraits, default: defaultValues.trait, key: 'Trait' },
        { options: weaponGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: qualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: StyleOptions, default: defaultValues.style, key: 'Style' }
      ];
      break;
    default:
      allOptions = [];
      break;
  }

  const createDropdown = (dropdownData, gridXs) => {
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
      <Grid key={dropdownData.key} item xs={gridXs} className='centered-div'>
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
                updateAttributes(piece, child.props.piecekey, child.props.value, child.props.optiondata.stone)
              }
            }
          >
            {dropdownData.options.map(option => Utils.generateSelectOptions(option.value, dropdownData.key, option))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  return (
    <span style={{ padding: '1rem' }}>
      <Card
        className={classes.card}
        raised
      >
        <CardHeader classes={{content: classes.centered}} title={gearAttributes.display} />
        <CardContent className={classes.content}>
          <Grid container>
            {createDropdown({ options: qualityOptions, default: defaultValues.quality, key: 'Quality' }, 12)}
            {allOptions.map(option => createDropdown(option, 6))}
          </Grid>
        </CardContent>
      </Card>
    </span>
  )
};

PieceCard.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  switch(ownProps.group) {
    case 'armor':
      return { gearAttributes: state.armorAttributes[ownProps.piece], glyphVal: state.armorAttributes[ownProps.piece].Glyph }
    case 'jewelry':
      return { gearAttributes: state.jewelryAttributes[ownProps.piece], glyphVal: state.jewelryAttributes[ownProps.piece].Glyph }
    case 'weapon':
      return { gearAttributes: state.weaponAttributes[ownProps.piece], glyphVal: state.weaponAttributes[ownProps.piece].Glyph }
    default:
      return { gearAttributes: {}, glyphVal: null }
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  switch(ownProps.group) {
    case 'armor':
      return { updateAttributes: (piece, attribute, value, stone) => {
        dispatch({ type: UPDATE_ARMOR, piece, attribute, value });
        dispatch({ type: UPDATE_ARMOR_MATS, piece, attribute, value, stone })
      }};
    case 'jewelry':
      return { updateAttributes: (piece, attribute, value, stone) => {
        dispatch({ type: UPDATE_JEWELRY, piece, attribute, value });
        dispatch({ type: UPDATE_JEWELRY_MATS, piece, attribute, value, stone });
      }};
    case 'weapon':
      return { updateAttributes: (piece, attribute, value, stone) => {
        dispatch({ type: UPDATE_WEAPONS, piece, attribute, value });
        dispatch({ type: UPDATE_WEAPON_MATS, piece, attribute, value, stone });
      }};
    default:
      return { updateAttributes: (piece, attribute, value) => console.log(`Failed to update ${ownProps.group} ${piece} ${attribute} to ${value}`) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceCard);