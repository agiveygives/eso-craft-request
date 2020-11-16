import initialState from './initialState';
import * as constants from './constants';
import * as types from './types';

const userReducer = (state = initialState, action: types.UserActionType) => {
  let newState = { ...state };

  switch(action.type) {
    case constants.SET_SESSION:
      newState.session = action.payload;
      break;
    case constants.SET_USER_INFO:
      newState.info = action.payload;
      break;
    default:
      break;
  }

  return newState;
}

export default userReducer;