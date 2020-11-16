import initialState from './initialState';
import * as constants from './constants';
import * as types from './types';

export default (state = initialState, action: types.UpdateSessionAction) => {
  let newState = { ...state };

  switch(action.type) {
    case constants.SET_SESSION:
      newState.session = action.payload;
      break;
    default:
      break;
  }

  return newState;
}
