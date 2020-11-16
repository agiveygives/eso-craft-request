import { StateType } from './types';

const initialState: StateType = {
  session: {
    tokenType: '',
    accessToken: '',
    refreshToken: '',
  },
  info: {
    userId: '',
    username: '',
    avatarUrl: '',
  }
}

export default initialState;
