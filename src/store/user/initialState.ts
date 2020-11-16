import { string } from "yargs";

import { StateType } from './types';

const initialState: StateType = {
  session: {
    tokenType: '',
    accessToken: '',
    refreshToken: '',
  },
}

export default initialState;
