import Discord from 'discord.js';
import DiscordApi from '../DiscordApi';
import { DiscordGuildType } from '../response/GuildResponse';
import { ErrorType } from '../types';

class GuildClient extends DiscordApi {
  private DiscordClient = new Discord.Client({
    intents: Discord.Intents.FLAGS.GUILDS,
  });

  /**
   * Get Discord guild information
   * @param authHeader - string
   * @param guildId - string
   */
  public async getGuild(authHeader: string, guildId: string): Promise<DiscordGuildType> {
    this.DiscordClient.fetchGuildTemplate()
  }
}

export default new GuildClient();
