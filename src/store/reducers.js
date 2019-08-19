import initialState from './initialState';
import {
  UPDATE_ARMOR_PIECES,
  UPDATE_JEWELRY_PIECES,
  UPDATE_WEAPON_PIECES,
  SET_ESO_NAME,
  UPDATE_GEAR_LEVEL,
  UPDATE_LEVEL_SLIDER,
  UPDATE_ARMOR,
  UPDATE_JEWELRY,
  UPDATE_WEAPONS,
  UPDATE_PAYMENT_TYPE,
  TERMS_RESPONSE,
  RESTART,
  TOGGLE_REVIEW,
  SUCCESSFUL_REQUEST,
  FAILED_REQUEST
} from './constants';

const reducer = (state = initialState, action) => {
  let newState = { ...state };

  switch(action.type) {
    case UPDATE_ARMOR_PIECES:
      newState.armorPieces = action.pieces;
      break;
    case UPDATE_JEWELRY_PIECES:
      newState.jewelryPieces = action.pieces;
      break;
    case UPDATE_WEAPON_PIECES:
      newState.weaponPieces = action.pieces;
      break;
    case SET_ESO_NAME:
        newState.esoName = action.username;
      break;
    case UPDATE_GEAR_LEVEL:
      newState.gearLevel = action.level;
      break;
    case UPDATE_ARMOR:
      newState.armorAttributes[action.piece][action.attribute] = action.value;
      break;
    case UPDATE_JEWELRY:
      newState.jewelryAttributes[action.piece][action.attribute] = action.value;
      break;
    case UPDATE_WEAPONS:
      newState.weaponAttributes[action.piece][action.attribute] = action.value;
      break;
    case UPDATE_LEVEL_SLIDER:
      newState.levelSliderValue = action.value;
      break;
    case UPDATE_PAYMENT_TYPE:
      newState.payment = action.value
      break;
    case TERMS_RESPONSE:
      newState.termsAccepted = action.response;
      newState.termsOpen = false;
      break;
    case TOGGLE_REVIEW:
      newState.review = action.show;
      break;
    case SUCCESSFUL_REQUEST:
      newState.failed = false;
      newState.success = true;
      break;
    case FAILED_REQUEST:
      newState.failed = true;
      newState.success = false;
      break;
    case RESTART:
      if (newState.termsAccepted) {
        newState.isSuccessful = false;
        newState.armorPieces = [];
        newState.jewelryPieces = [];
        newState.weaponPieces = [];
      } else {
        newState.termsOpen = true;
      }
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
