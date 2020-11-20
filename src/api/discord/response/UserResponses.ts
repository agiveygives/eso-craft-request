export interface GetUserResponse {
  username: string;
  locale: string;
  mfa_enabled: boolean;
  flags: number;
  avatar: string;
  discriminator: string;
  id: string;
}

export interface GetUserGuildsResponse {
  features: string[];
  icon: string;
  id: string;
  name: string;
  owner: boolean
  permissions: number
  permissions_new: string
}
