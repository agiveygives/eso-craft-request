import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// constants and Utils
import { qualityOptions } from '../../constants/qualityOptions';
import { armorWeights, armorTraits, armorGlyphs } from '../../constants/armorOptions';
import { jewelryTraits, jewelryGlyphs } from '../../constants/jewelryOptions';
import { primaryWeapons, secondaryWeapons, weaponTraits, weaponGlyphs } from '../../constants/weaponOptions';
import SetOptions from '../../constants/setOptions';
import StyleOptions from '../../constants/styleOptions';
import { UPDATE_ARMOR, UPDATE_JEWELRY, UPDATE_WEAPONS, UPDATE_ARMOR_MATS, UPDATE_WEAPON_MATS, UPDATE_JEWELRY_MATS } from '../../store/constants';
import Dropdown from './Dropdown';

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

const PieceCard = ({
  group,
  piece,
  gearAttributes,
  updateAttributes,
  glyphVal
}) => {
  const classes = useStyles();
  let allPieceOptions;
  let shieldOptions;

  switch (group) {
    case 'armor':
      allPieceOptions = [
        { options: armorWeights, default: defaultValues.weight, key: 'Weight' },
        { options: armorTraits, default: defaultValues.trait, key: 'Trait' },
        { options: armorGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: qualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: StyleOptions, default: defaultValues.style, key: 'Style' }
      ];
      break;
    case 'jewelry':
      allPieceOptions = [
        { options: jewelryTraits, default: defaultValues.trait, key: 'Trait' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: jewelryGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: qualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' }
      ];
      break;
    case 'weapon':
      let weapons = piece.includes('primary') ? primaryWeapons : secondaryWeapons;
      allPieceOptions = [
        { options: weapons, default: defaultValues.weapon, key: 'Weapon' },
        { options: weaponTraits, default: defaultValues.trait, key: 'Trait' },
        { options: weaponGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: qualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: StyleOptions, default: defaultValues.style, key: 'Style' }
      ];
      shieldOptions = [
        { options: weapons, default: defaultValues.weapon, key: 'Weapon' },
        { options: armorTraits, default: defaultValues.trait, key: 'Trait' },
        { options: armorGlyphs, default: defaultValues.glyph, key: 'Glyph' },
        { options: qualityOptions, default: defaultValues.glyphQuality, key: 'Glyph Quality' },
        { options: SetOptions, default: defaultValues.set, key: 'Set' },
        { options: StyleOptions, default: defaultValues.style, key: 'Style' }
      ]
      break;
    default:
      allPieceOptions = [];
      break;
  }

  const [allOptions, setAllOptions] = React.useState(allPieceOptions)

  return (
    <span style={{ padding: '1rem' }}>
      <Card
        className={classes.card}
        raised
      >
        <CardHeader classes={{content: classes.centered}} title={gearAttributes.display} />
        <CardContent className={classes.content}>
          <Grid container>
            <Dropdown
              piece={piece}
              dropdownData={{ options: qualityOptions, default: defaultValues.quality, key: 'Quality' }}
              defaultValues={defaultValues}
              gridSize={12}
              gearAttributes={gearAttributes}
              updateAttributes={updateAttributes}
              glyphVal={glyphVal}
              setAllOptions={setAllOptions}
              allPieceOptions={allPieceOptions}
              shieldOptions={shieldOptions}
            />
            {allOptions.map(option => (
              <Dropdown
                piece={piece}
                dropdownData={option}
                defaultValues={defaultValues}
                gridSize={6}
                gearAttributes={gearAttributes}
                updateAttributes={updateAttributes}
                glyphVal={glyphVal}
                setAllOptions={setAllOptions}
                allPieceOptions={allPieceOptions}
                shieldOptions={shieldOptions}
              />
            ))}
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
      return { updateAttributes: (piece, attribute, value, stone, essenceRune, potency) => {
        dispatch({ type: UPDATE_ARMOR, piece, attribute, value });
        dispatch({ type: UPDATE_ARMOR_MATS, piece, attribute, value, stone, essenceRune, potency  })
      }};
    case 'jewelry':
      return { updateAttributes: (piece, attribute, value, stone, essenceRune, potency) => {
        dispatch({ type: UPDATE_JEWELRY, piece, attribute, value });
        dispatch({ type: UPDATE_JEWELRY_MATS, piece, attribute, value, stone, essenceRune, potency });
      }};
    case 'weapon':
      return { updateAttributes: (piece, attribute, value, stone, essenceRune, potency) => {
        dispatch({ type: UPDATE_WEAPONS, piece, attribute, value });
        dispatch({ type: UPDATE_WEAPON_MATS, piece, attribute, value, stone, essenceRune, potency  });
      }};
    default:
      return { updateAttributes: (piece, attribute, value) => console.log(`Failed to update ${ownProps.group} ${piece} ${attribute} to ${value}`) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceCard);