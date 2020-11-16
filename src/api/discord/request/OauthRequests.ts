export type GetOauthTokenRequest = {
  client_id: string;
  client_secret: string;
  grant_type: 'authorization_code';
  code: string;
  redirect_uri: string;
  scope: 'identity email guilds';
}

export type RefreshOauthTokenRequest = {
  client_id: string;
  client_secret: string;
  grant_type: 'refresh_token';
  refresh_token: string;
  redirect_uri: string;
  scope: 'identity email guilds';
}
