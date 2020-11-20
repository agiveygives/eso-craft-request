import { GuildsType, UpdateGuildsAction } from './types';
import { UPDATE_GUILDS } from './constants';
import DiscordPermissions from '../../utils/DiscordPermissions';
import { GetUserGuildsResponse } from '../../api/discord/response/UserResponses';

export const GetAdminGuilds = (guilds: GetUserGuildsResponse[]): UpdateGuildsAction => {
  const adminGuilds = guilds.filter((guild) => {
    if (guild.owner || (guild.permissions & DiscordPermissions.ADMINISTRATOR)) return true;

    return false
  });

  const adminGuildsPayload: GuildsType[] = adminGuilds.map((guild): GuildsType => (
    {
      id: guild.id,
      iconUrl: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
      name: guild.name,
      owner: guild.owner,
    }
  ))

  return {
    type: UPDATE_GUILDS,
    payload: adminGuildsPayload,
  }
};
