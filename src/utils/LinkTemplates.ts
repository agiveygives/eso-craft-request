/**
 * Generate Avatar Image link for a discord user.
 * @param userId - string of the discord user id
 * @param avatarId - string of the discord avatar id
 */
export const DiscordAvatarUrl = (userId: string, avatarId: string): string => (
  `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`
);
