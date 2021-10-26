import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardContent, CardHeader, Grid,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import { qualityOptions } from '../../constants/qualityOptions';
import { armorWeights, armorTraits, armorGlyphs } from '../../constants/armorOptions';
import { jewelryTraits, jewelryGlyphs } from '../../constants/jewelryOptions';
import {
  primaryWeapons, secondaryWeapons, weaponTraits, weaponGlyphs,
} from '../../constants/weaponOptions';
import SetOptions from '../../constants/setOptions';
import StyleOptions from '../../constants/styleOptions';
import defaultDropdownValues from '../../constants/defaultDropdownValues';
import {
  UPDATE_ARMOR, UPDATE_JEWELRY, UPDATE_WEAPONS, UPDATE_ARMOR_MATS, UPDATE_WEAPON_MATS, UPDATE_JEWELRY_MATS,
} from '../../store/constants';
import Dropdown from './Dropdown';
import useStyles from './styles';
import propTypes from './propTypes';

const PieceCard = ({
  group,
  piece,
  gearAttributes,
  updateAttributes,
  glyphVal,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const sortedSetOptions = useRef(SetOptions(intl));
  const sortedStyleOptions = useRef(StyleOptions(intl));

  const [allPieceOptions, setAllPieceOptions] = useState([]);
  const [shieldOptions, setShieldOptions] = useState();

  useEffect(() => {
    switch (group) {
      case 'armor':
        setAllPieceOptions([
          { options: armorWeights, default: defaultDropdownValues.weight, key: 'Weight' },
          { options: armorTraits, default: defaultDropdownValues.trait, key: 'Trait' },
          { options: armorGlyphs, default: defaultDropdownValues.glyph, key: 'Glyph' },
          { options: qualityOptions, default: defaultDropdownValues.glyphQuality, key: 'Glyph Quality' },
          { options: sortedSetOptions.current, default: defaultDropdownValues.set, key: 'Set' },
          { options: sortedStyleOptions.current, default: defaultDropdownValues.style, key: 'Style' },
        ]);
        break;
      case 'jewelry':
        setAllPieceOptions([
          { options: jewelryTraits, default: defaultDropdownValues.trait, key: 'Trait' },
          { options: sortedSetOptions.current, default: defaultDropdownValues.set, key: 'Set' },
          { options: jewelryGlyphs, default: defaultDropdownValues.glyph, key: 'Glyph' },
          { options: qualityOptions, default: defaultDropdownValues.glyphQuality, key: 'Glyph Quality' },
        ]);
        break;
      case 'weapon':
        setAllPieceOptions([
          {
            options: piece.includes('primary') ? primaryWeapons : secondaryWeapons,
            default: defaultDropdownValues.weapon,
            key: 'Weapon',
          },
          { options: weaponTraits, default: defaultDropdownValues.trait, key: 'Trait' },
          { options: weaponGlyphs, default: defaultDropdownValues.glyph, key: 'Glyph' },
          { options: qualityOptions, default: defaultDropdownValues.glyphQuality, key: 'Glyph Quality' },
          { options: sortedSetOptions.current, default: defaultDropdownValues.set, key: 'Set' },
          { options: sortedStyleOptions.current, default: defaultDropdownValues.style, key: 'Style' },
        ]);
        setShieldOptions([
          {
            options: piece.includes('primary') ? primaryWeapons : secondaryWeapons,
            default: defaultDropdownValues.weapon,
            key: 'Weapon',
          },
          { options: armorTraits, default: defaultDropdownValues.trait, key: 'Trait' },
          { options: armorGlyphs, default: defaultDropdownValues.glyph, key: 'Glyph' },
          { options: qualityOptions, default: defaultDropdownValues.glyphQuality, key: 'Glyph Quality' },
          { options: sortedSetOptions.current, default: defaultDropdownValues.set, key: 'Set' },
          { options: sortedStyleOptions.current, default: defaultDropdownValues.style, key: 'Style' },
        ]);
        break;
      default:
        setAllPieceOptions([]);
        break;
    }
  }, [group, sortedSetOptions, sortedStyleOptions, piece]);

  /* This is necessary to handle trait and glypth options changing when shield is selected */
  const [allOptions, setAllOptions] = useState(allPieceOptions);
  useEffect(() => {
    setAllOptions(allPieceOptions);
  }, [allPieceOptions]);

  return (
    <span className={classes.wrapper}>
      <Card
        className={classes.card}
        raised
      >
        <CardHeader
          classes={{ content: classes.centered }}
          title={intl.formatMessage({ id: gearAttributes.display })}
        />
        <CardContent className={classes.content}>
          <Grid container>
            <Dropdown
              piece={piece}
              data={{ options: qualityOptions, default: defaultDropdownValues.quality, key: 'Quality' }}
              defaultDropdownValues={defaultDropdownValues}
              gridSize={12}
              gearAttributes={gearAttributes}
              updateAttributes={updateAttributes}
              glyphVal={glyphVal}
              setAllOptions={setAllOptions}
              allPieceOptions={allPieceOptions}
              shieldOptions={shieldOptions}
            />
            {allOptions.map((option) => (
              <Dropdown
                key={option.key}
                piece={piece}
                data={option}
                defaultDropdownValues={defaultDropdownValues}
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
  );
};

PieceCard.defaultProps = {
  glyphVal: undefined,
};

PieceCard.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.group) {
    case 'armor':
      return {
        gearAttributes: state.armorAttributes[ownProps.piece],
        glyphVal: state.armorAttributes[ownProps.piece].Glyph,
      };
    case 'jewelry':
      return {
        gearAttributes: state.jewelryAttributes[ownProps.piece],
        glyphVal: state.jewelryAttributes[ownProps.piece].Glyph,
      };
    case 'weapon':
      return {
        gearAttributes: state.weaponAttributes[ownProps.piece],
        glyphVal: state.weaponAttributes[ownProps.piece].Glyph,
      };
    default:
      return { gearAttributes: {}, glyphVal: null };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  switch (ownProps.group) {
    case 'armor':
      return {
        updateAttributes: (piece, attribute, value = '', stone = 'common.none', essenceRune, potency) => {
          dispatch({
            type: UPDATE_ARMOR, piece, attribute, value,
          });
          dispatch({
            type: UPDATE_ARMOR_MATS, piece, attribute, value: value || 'None', stone, essenceRune, potency,
          });
        },
      };
    case 'jewelry':
      return {
        updateAttributes: (piece, attribute, value = '', stone = 'common.none', essenceRune, potency) => {
          dispatch({
            type: UPDATE_JEWELRY, piece, attribute, value,
          });
          dispatch({
            type: UPDATE_JEWELRY_MATS, piece, attribute, value: value || 'None', stone, essenceRune, potency,
          });
        },
      };
    case 'weapon':
      return {
        updateAttributes: (piece, attribute, value = '', stone = 'common.none', essenceRune, potency) => {
          dispatch({
            type: UPDATE_WEAPONS, piece, attribute, value,
          });
          dispatch({
            type: UPDATE_WEAPON_MATS, piece, attribute, value: value || 'None', stone, essenceRune, potency,
          });
        },
      };
    default:
      return {
        updateAttributes: (piece, attribute, value) => (
          console.log(`Failed to update ${ownProps.group} ${piece} ${attribute} to ${value}`)
        ),
      };
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceCard);
