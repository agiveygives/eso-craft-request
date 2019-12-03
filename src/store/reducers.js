import initialState from './initialState';
import * as constants from './constants';

const reducer = (state = initialState, action) => {
  let newState = { ...state };

  switch(action.type) {
    case constants.UPDATE_ARMOR_PIECES:
      newState.armorPieces = action.pieces;
      break;
    case constants.UPDATE_JEWELRY_PIECES:
      newState.jewelryPieces = action.pieces;
      break;
    case constants.UPDATE_WEAPON_PIECES:
      newState.weaponPieces = action.pieces;
      break;
    case constants.SET_ESO_NAME:
        newState.esoName = action.username;
      break;
    case constants.UPDATE_GEAR_LEVEL:
      newState.gearLevel = action.level;
      break;
    case constants.UPDATE_ARMOR:
      newState.armorAttributes[action.piece][action.attribute] = action.value;
      break;
    case constants.UPDATE_JEWELRY:
      newState.jewelryAttributes[action.piece][action.attribute] = action.value;
      break;
    case constants.UPDATE_WEAPONS:
      newState.weaponAttributes[action.piece][action.attribute] = action.value;
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
    default:
      if (action.type !== "@@INIT") {
        console.log(`WARNING: ${action.type} is not a reducer`);
      }
      break;
  }

  return newState;
};

export default reducer;
