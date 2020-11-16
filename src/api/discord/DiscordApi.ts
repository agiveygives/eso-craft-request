abstract class DiscordApi {
  protected baseUrl: string;

  constructor() {
    const DiscordApiBaseUrl = process.env.REACT_APP_DISCORD_API_BASE_URL;
    if (DiscordApiBaseUrl === undefined) {
      throw new Error('REACT_APP_DISCORD_API_BASE_URL not set in .env file');
    }

    this.baseUrl = DiscordApiBaseUrl;
  }
}

export default DiscordApi;
