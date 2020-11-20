import * as constants from './constants';

export interface SessionType {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

interface UpdateSessionAction {
  type: typeof constants.SET_SESSION;
  payload: SessionType;
}

export interface InfoType {
  userId: string;
  username: string;
  avatarUrl: string;
}

interface UpdateInfoAction {
  type: typeof constants.SET_USER_INFO;
  payload: InfoType;
}

export interface GuildsType {
  id: string;
  iconUrl: string;
  name: string;
  owner: boolean;
}

export interface UpdateGuildsAction {
  type: typeof constants.UPDATE_GUILDS;
  payload: GuildsType[];
}

export type UserActionType = UpdateSessionAction | UpdateInfoAction | UpdateGuildsAction

export interface StateType {
  session: SessionType;
  info: InfoType;
  guilds: GuildsType[];
}
