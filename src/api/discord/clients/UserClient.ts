import DiscordApi from '../DiscordApi';
import { GetUserResponse } from '../response/UserResponses';
import { ErrorType } from '../types';

class OauthClient extends DiscordApi {
  /**
   * Get Token
   * @authHeader - string
   */
  public async getUser(authHeader: string): Promise<GetUserResponse> {
    const response = await fetch(`${this.baseUrl}/users/@me`, {
      headers: {
        Authorization: authHeader,
      }
    });

    if (response.ok) {
      return response.json() as Promise<GetUserResponse>;
    } else {
      const responseBody = await response.json() as ErrorType;
      throw new Error(`Response: ${responseBody.error} ${responseBody.error_description}`);
    }
  }
}

export default new OauthClient();