export type GetOauthTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
}

export type RefreshOauthTokenResponse = {
  client_id: string;
  client_secret: string;
  grant_type: 'refresh_token';
  refresh_token: string;
  redirect_uri: string;
  scope: 'identity email guilds';
}
