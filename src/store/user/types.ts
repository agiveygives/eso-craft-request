import * as constants from './constants';

export interface SessionType {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

interface UpdateSessionAction {
  type: typeof constants.SET_SESSION;
  payload: SessionType
}

export interface InfoType {
  userId: string;
  username: string;
  avatarUrl: string;
}

interface UpdateInfoAction {
  type: typeof constants.SET_USER_INFO;
  payload: InfoType
}

export type UserActionType = UpdateSessionAction | UpdateInfoAction

export interface StateType {
  session: SessionType;
  info: InfoType;
}
