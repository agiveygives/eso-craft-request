export const getGuildByName = (name: string) => (
  encodeURI(`${process.env.REACT_APP_ESO_CRAFT_REQUEST_API_BASE_URL}/guilds?name=${name}`)
);

export const getGuildByDiscordId = (id: number) => (
  `${process.env.REACT_APP_ESO_CRAFT_REQUEST_API_BASE_URL}/guilds?discordId=${id}`
)
