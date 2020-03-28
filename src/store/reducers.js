import initialState from './initialState';
import * as constants from './constants';
import utils from './utils';
import { armorTraits, armorGlyphs } from '../constants/armorOptions';
import { weaponTraits, weaponGlyphs } from '../constants/weaponOptions';
import { jewelryTraits, jewelryGlyphs } from '../constants/jewelryOptions';
import styleOptions from '../constants/styleOptions';
import { additivePotencyRunes, subtractivePotencyRunes } from '../constants/glyphMats';
import craftableLevels from '../constants/craftableLevels';

const reducer = (state = initialState, action) => {
  let newState = { ...state };

  switch(action.type) {
    case constants.UPDATE_ARMOR_PIECES:
      newState.materials = utils.addRemovePieceMats(
        newState.armorPieces,
        newState.materials,
        newState.armorAttributes,
        newState.gearLevel,
        action
      );
      newState.traits = utils.addRemoveStones(
        newState.armorPieces,
        newState.traits,
        newState.armorAttributes,
        armorTraits,
        'Trait',
        action
      );
      newState.styles = utils.addRemoveStones(
        newState.armorPieces,
        newState.styles,
        newState.armorAttributes,
        styleOptions,
        'Style',
        action
      );
      newState.quality = utils.addRemoveQualityMats(
        newState.armorPieces,
        newState.quality,
        newState.armorAttributes,
        'armor',
        action
      );
      newState.glyphMaterials = utils.addRemoveGlyphMats(
        newState.armorPieces,
        newState.gearLevel,
        newState.glyphMaterials,
        newState.armorAttributes,
        armorGlyphs,
        action
      );
      newState.armorPieces = action.pieces;
      break;
    case constants.UPDATE_JEWELRY_PIECES:
      newState.materials = utils.addRemovePieceMats(
        newState.jewelryPieces,
        newState.materials,
        newState.jewelryAttributes,
        newState.gearLevel,
        action
      );
      newState.traits = utils.addRemoveStones(
        newState.jewelryPieces,
        newState.traits,
        newState.jewelryAttributes,
        jewelryTraits,
        'Trait',
        action
      );
      newState.quality = utils.addRemoveQualityMats(
        newState.jewelryPieces,
        newState.quality,
        newState.jewelryAttributes,
        'Jewelry',
        action
      );
      newState.glyphMaterials = utils.addRemoveGlyphMats(
        newState.jewelryPieces,
        newState.gearLevel,
        newState.glyphMaterials,
        newState.jewelryAttributes,
        jewelryGlyphs,
        action
      );
      newState.jewelryPieces = action.pieces;
      break;
    case constants.UPDATE_WEAPON_PIECES:
      newState.materials = utils.addRemovePieceMats(
        newState.weaponPieces,
        newState.materials,
        newState.weaponAttributes,
        newState.gearLevel,
        action
      );
      newState.traits = utils.addRemoveStones(
        newState.weaponPieces,
        newState.traits,
        newState.weaponAttributes,
        weaponTraits,
        'Trait',
        action
      );
      newState.styles = utils.addRemoveStones(
        newState.weaponPieces,
        newState.styles,
        newState.weaponAttributes,
        styleOptions,
        'Style',
        action
      );
      newState.quality = utils.addRemoveQualityMats(
        newState.weaponPieces,
        newState.quality,
        newState.weaponAttributes,
        'weapon',
        action
      );
      newState.glyphMaterials = utils.addRemoveGlyphMats(
        newState.weaponPieces,
        newState.gearLevel,
        newState.glyphMaterials,
        newState.weaponAttributes,
        weaponGlyphs,
        action
      );
      newState.weaponPieces = action.pieces;
      break;
    case constants.SET_ESO_NAME:
        newState.esoName = action.username;
      break;
    case constants.UPDATE_GEAR_LEVEL:
      newState.gearLevel = action.level;

      const newMaterials = newState.materials.map(mats => (
        utils.calculateItemMats(
          action.level,
          mats.gearType,
          mats.weight,
          mats.requestPiece
        )
      ))
      newState.materials = newMaterials;

      const newPotencyRunes = newState.glyphMaterials.potencyRunes.map(rune => {
        const potencyRunes = rune.potency === 'additive' ? additivePotencyRunes : subtractivePotencyRunes;

        const levelIndex = craftableLevels.findIndex(craftableLevel => craftableLevel === newState.gearLevel);

        const potencyRune = potencyRunes.find((rune, index) => (
          potencyRunes.length === index + 1
            || (
              craftableLevels.findIndex(level => level === rune.minimumCraftableLevel) <= levelIndex
              && craftableLevels.findIndex(level => level === potencyRunes[index + 1].minimumCraftableLevel) > levelIndex
            )
        ));

        return {
          piece: rune.piece,
          name: potencyRune.name,
          potency: rune.potency
        };
      });

      newState.glyphMaterials.potencyRunes = newPotencyRunes;

      break;
    case constants.UPDATE_ARMOR:
      newState.armorAttributes[action.piece][action.attribute] = action.value;
      break;
    case constants.UPDATE_ARMOR_MATS:
      switch (action.attribute) {
        case 'Weight':
          newState.materials = utils.updateMats(
            newState.materials,
            newState.armorAttributes,
            newState.gearLevel,
            action
          );
          if (newState.armorAttributes[action.piece].Quality) {
            newState.quality = utils.updateQualityMats(
              newState.quality,
              newState.armorAttributes[action.piece].Quality,
              action.value,
              action.piece
            )
          }
          break;
        case 'Style':
          newState.styles = utils.updateStones(
            newState.styles,
            action.piece,
            action.stone
          )
          break;
        case 'Trait':
          newState.traits = utils.updateStones(
            newState.traits,
            action.piece,
            action.stone
          )
          break;
        case 'Quality':
          if (newState.armorAttributes[action.piece].Weight) {
            newState.quality = utils.updateQualityMats(
              newState.quality,
              action.value,
              newState.armorAttributes[action.piece].Weight,
              action.piece
            )
          }
          break;
        case 'Glyph':
          if (action.value === "None") {
            newState.glyphMaterials = utils.removeGlyph(newState.glyphMaterials, action.piece);
          } else {
            newState.glyphMaterials = utils.getGlyphMats(
              newState.glyphMaterials,
              action.piece,
              newState.gearLevel,
              action.potency,
              action.essenceRune,
              newState.armorAttributes[action.piece]['Glyph Quality']
            )
          }
          break;
        case 'Glyph Quality':
          newState.glyphMaterials = utils.getGlyphMats(
            newState.glyphMaterials,
            action.piece,
            newState.gearLevel,
            action.potency,
            action.essenceRune,
            action.value
          )
          break;
        default:
          break;
      }
      break;
    case constants.UPDATE_JEWELRY:
      newState.jewelryAttributes[action.piece][action.attribute] = action.value;
      break;
    case constants.UPDATE_JEWELRY_MATS:
      switch (action.attribute) {
        case 'Trait':
          newState.traits = utils.updateStones(
            newState.traits,
            action.piece,
            action.stone
          )
          break;
        case 'Quality':
          newState.quality = utils.updateQualityMats(
            newState.quality,
            action.value,
            'Jewelry',
            action.piece
          )
          break;
          case 'Glyph':
            if (action.value === "None") {
              newState.glyphMaterials = utils.removeGlyph(newState.glyphMaterials, action.piece);
            } else {
              newState.glyphMaterials = utils.getGlyphMats(
                newState.glyphMaterials,
                action.piece,
                newState.gearLevel,
                action.potency,
                action.essenceRune,
                newState.jewelryAttributes[action.piece]['Glyph Quality']
              )
            }
            break;
          case 'Glyph Quality':
            newState.glyphMaterials = utils.getGlyphMats(
              newState.glyphMaterials,
              action.piece,
              newState.gearLevel,
              action.potency,
              action.essenceRune,
              action.value
            )
            break;
        default:
          break;
      }
      break;
    case constants.UPDATE_WEAPONS:
      newState.weaponAttributes[action.piece][action.attribute] = action.value;
      break;
    case constants.UPDATE_WEAPON_MATS:
      switch (action.attribute) {
        case 'Weapon':
          newState.materials = utils.updateMats(
            newState.materials,
            newState.weaponAttributes,
            newState.gearLevel,
            action
          );
          if (newState.weaponAttributes[action.piece].Quality) {
            let type;

            if(['axe', 'mace', 'sword', 'battle axe', 'maul', 'greatsword', 'dagger']
                .includes(action.value.toLowerCase())
              ) {
                type = 'Heavy';
            } else {
              type = 'wood';
            }

            newState.quality = utils.updateQualityMats(
              newState.quality,
              newState.weaponAttributes[action.piece].Quality,
              type,
              action.piece
            )
          }
          break;
        case 'Style':
          newState.styles = utils.updateStones(
            newState.styles,
            action.piece,
            action.stone
          )
          break;
        case 'Trait':
          newState.traits = utils.updateStones(
            newState.traits,
            action.piece,
            action.stone
          )
          break;
        case 'Quality':
          if (newState.weaponAttributes[action.piece].Weapon) {
            let type;

            if(['axe', 'mace', 'sword', 'battle axe', 'maul', 'greatsword', 'dagger']
                .includes(newState.weaponAttributes[action.piece].Weapon.toLowerCase())
              ) {
                type = 'Heavy';
            } else {
              type = 'wood';
            }

            newState.quality = utils.updateQualityMats(
              newState.quality,
              action.value,
              type,
              action.piece
            )
          }
          break;
        case 'Glyph':
          if (action.value === "None") {
            newState.glyphMaterials = utils.removeGlyph(newState.glyphMaterials, action.piece);
          } else {
            newState.glyphMaterials = utils.getGlyphMats(
              newState.glyphMaterials,
              action.piece,
              newState.gearLevel,
              action.potency,
              action.essenceRune,
              newState.weaponAttributes[action.piece]['Glyph Quality']
            )
          }
          break;
        case 'Glyph Quality':
          newState.glyphMaterials = utils.getGlyphMats(
            newState.glyphMaterials,
            action.piece,
            newState.gearLevel,
            action.potency,
            action.essenceRune,
            action.value
          )
          break;
        default:
          break;
      }
      break;
    case constants.UPDATE_LEVEL_SLIDER:
      newState.levelSliderValue = action.value;
      break;
    case constants.UPDATE_PAYMENT_TYPE:
      newState.payment = action.value
      break;
    case constants.TERMS_RESPONSE:
      newState.termsAccepted = action.response;
      newState.termsOpen = false;
      break;
    case constants.TOGGLE_REVIEW:
      newState.review = action.show;
      break;
    case constants.SUCCESSFUL_REQUEST:
      newState.failed = false;
      newState.success = true;
      break;
    case constants.FAILED_REQUEST:
      newState.failed = true;
      newState.success = false;
      break;
    case constants.RETRY:
        newState.failed = false;
        newState.success = false;
      break;
    case constants.RESTART:
      if (newState.termsAccepted) {
        newState.success = false;
        newState.failed = false;
        newState.armorPieces = [];
        newState.jewelryPieces = [];
        newState.weaponPieces = [];
      } else {
        newState.termsOpen = true;
      }
      break;
    case constants.SET_GUILD_DATA:
      newState.guildData = action.guildData;
      break;
    case constants.SET_GUILD_MNEMONIC:
      newState.guildMnemonic = action.mnemonic;
      break;
    case constants.SET_GUILD_REQUEST_CODE:
      newState.guildRequestCode = action.statusCode;
      break;
    default:
      if (action.type !== "@@INIT") {
        console.log(`WARNING: ${action.type} is not a reducer`);
      }
      break;
  }

  return newState;
};

export default reducer;
