export interface GetUserResponse {
  username: string;
  locale: string;
  mfa_enabled: Boolean;
  flags: number;
  avatar: string;
  discriminator: string;
  id: string;
}
