import { createContext } from 'react';

export interface SelectedGuildType {
  discordId: string;
  iconUrl: string;
  name: string;
}

const SelectedGuildContext = createContext<SelectedGuildType | undefined>(undefined);

export default SelectedGuildContext;
