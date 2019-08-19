import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'terra-card';
import Spacer from 'terra-spacer';
import ContentContainer from 'terra-content-container';
import Heading from 'terra-heading';
import chroma from 'chroma-js';
import Select from 'react-select';
import QualityOptions from '../../constants/qualityOptions';
import { armorWeights, armorTraits, armorGlyphs } from '../../constants/armorOptions';
import { jewelryTraits, jewelryGlyphs } from '../../constants/jewelryOptions';
import { primaryWeapons, secondaryWeapons, weaponTraits, weaponGlyphs } from '../../constants/weaponOptions';
import SetOptions from '../../constants/setOptions';
import StyleOptions from '../../constants/styleOptions';
import { UPDATE_ARMOR, UPDATE_JEWELRY, UPDATE_WEAPONS } from '../../store/constants';

const propTypes = {
  group: PropTypes.oneOf(['armor', 'jewelry', 'weapon']).isRequired,
  piece: PropTypes.string.isRequired,

  // from redux
  gearAttributes: PropTypes.shape({}).isRequired,
  updateAttributes: PropTypes.func.isRequired,
  glyphVal: PropTypes.string
};

const defaultValues = {
  glyph: { value: null, label: 'Glyph', color: '#FF5630', isFixed: true },
  glyphQuality: { value: null, label: 'Glyph Quality', color: '#FF5630', isFixed: true },
  trait: { value: null, label: 'Trait', color: '#FF5630', isFixed: true },
  quality: { value: null, label: 'Quality', color: '#FF5630', isFixed: true },
  set: { value: null, label: 'Set', color: '#FF5630', isFixed: true },
  style: { value: null, label: 'Style', color: '#FF5630', isFixed: true },
  weapon: { value: null, label: 'Weapon', color: '#FF5630', isFixed: true },
  weight: { value: null, label: 'Weight', color: '#FF5630', isFixed: true }
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
  let allOptions;

  switch (group) {
    case 'armor':
      allOptions = [
        { options: armorWeights, default: defaultValues.weight, key: 'Weight' },
        { options: armorTraits, default: defaultValues.trait, key: 'Trait' },
        { options: armorGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: QualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: StyleOptions, default: defaultValues.style, key: 'Style' }
      ];
      break;
    case 'jewelry':
      allOptions = [
        { options: jewelryTraits, default: defaultValues.trait, key: 'Trait' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: jewelryGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: QualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' }
      ];
      break;
    case 'weapon':
      let weapons = piece.includes('primary') ? primaryWeapons : secondaryWeapons;
      allOptions = [
        { options: weapons, default: defaultValues.weapon, key: 'Weapon' },
        { options: weaponTraits, default: defaultValues.trait, key: 'Trait' },
        { options: weaponGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: QualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: StyleOptions, default: defaultValues.style, key: 'Style' }
      ];
      break;
    default:
      allOptions = [];
      break;
  }

  const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    container: styles => ({ ...styles, width: '18em' }),
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  const createDropdown = (dropdownData) => {
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

    return (
      <Spacer padding="large" key={dropdownData.key}>
        <Select
          isDisabled={glyphVal === 'None' && dropdownData.key === 'Glyph Quality'}
          defaultValue={dropdownData.default}
          options={dropdownData.options}
          styles={colourStyles}
          onChange={option => { updateAttributes(piece, dropdownData.key, option.label) } }
        />
      </Spacer>
    );
  };

  return (
    <Spacer paddingTop="medium" paddingRight="medium">
      <Card style={{
          color: 'black',
          backgroundColor: '#e8e9ea',
          overflow: 'visible'
        }}
        variant="raised"
      >
        <Card.Body isContentCentered>
          <ContentContainer
            style={{ width: "40em" }}
            header={
              <Heading level={3} size="small" weight={700}>
                {gearAttributes.display}
              </Heading>
            }
          >
            <div className="centered-div">
              {createDropdown({ options: QualityOptions, default: defaultValues.quality, key: 'Quality' })}
            </div>
            <div className="centered-div">
              {allOptions.map(createDropdown)}
            </div>
          </ContentContainer>
        </Card.Body>
      </Card>
    </Spacer>
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
      return { updateAttributes: (piece, attribute, value) => (
        dispatch({ type: UPDATE_ARMOR, piece, attribute, value })
      )};
    case 'jewelry':
      return { updateAttributes: (piece, attribute, value) => (
        dispatch({ type: UPDATE_JEWELRY, piece, attribute, value })
      )};
    case 'weapon':
      return { updateAttributes: (piece, attribute, value) => (
        dispatch({ type: UPDATE_WEAPONS, piece, attribute, value })
      )};
    default:
      return { updateAttributes: (piece, attribute, value) => console.log(`Failed to update ${ownProps.group} ${piece} ${attribute} to ${value}`) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceCard);