import DiscordApi from '../DiscordApi';
import { GetOauthTokenRequest, RefreshOauthTokenRequest } from '../request/OauthRequests';
import { GetOauthTokenResponse, RefreshOauthTokenResponse } from '../response/OauthResponses';
import { ErrorType } from '../types';

class OauthClient extends DiscordApi {
  /**
   * Get Token
   * @param code - string
   */
  public async getToken(code: string): Promise<GetOauthTokenResponse> {
    const request: GetOauthTokenRequest = {
      client_id: process.env.REACT_APP_DISCORD_API_CLIENT_ID || '',
      client_secret: process.env.REACT_APP_DISCORD_API_CLIENT_SECRET || '',
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REACT_APP_DISCORD_API_REDIRECT_URI || '',
      scope: 'identity email guilds bot applications.commands',
    }

    const response = await fetch(`${this.baseUrl}/oauth2/token`, {
      method: 'POST',
      body: new URLSearchParams(request),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      return response.json() as Promise<GetOauthTokenResponse>;
    } else {
      const responseBody = await response.json() as ErrorType;
      throw new Error(`Response: ${responseBody.error} ${responseBody.error_description}`);
    }
  }

  /**
   * Refresh Token
   * @param token - string
   */
  public async refreshToken(token: string): Promise<RefreshOauthTokenResponse> {
    const request: RefreshOauthTokenRequest = {
      client_id: process.env.REACT_APP_DISCORD_API_CLIENT_ID || '',
      client_secret: process.env.REACT_APP_DISCORD_API_CLIENT_SECRET || '',
      grant_type: 'refresh_token',
      refresh_token: token,
      redirect_uri: process.env.REACT_APP_DISCORD_API_REDIRECT_URI || '',
      scope: 'identity email guilds bot applications.commands',
    }

    const response = await fetch(`${this.baseUrl}/oauth2/token`, {
      method: 'POST',
      body: new URLSearchParams(request),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      return response.json() as Promise<RefreshOauthTokenResponse>;
    } else {
      const responseBody = await response.json() as ErrorType;
      throw new Error(`Response: ${responseBody.error} ${responseBody.error_description}`);
    }
  }
}

export default new OauthClient();
