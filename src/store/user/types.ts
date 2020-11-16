import * as constants from './constants';

export interface SessionType {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateSessionAction {
  type: typeof constants.SET_SESSION;
  payload: SessionType
}

export interface StateType {
  session: SessionType
}
