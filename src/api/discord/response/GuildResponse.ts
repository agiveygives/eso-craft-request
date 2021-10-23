export type DiscordRoleType = {
  id: string;
  name: string;
  permissions: string;
  position: number;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
};

export type DiscordEmojiType = {
  name: string;
  roles: DiscordRoleType[];
  id: string;
  require_colons: boolean;
  managed: boolean;
  animated: boolean;
  available: boolean;
};

export type DiscordGuildType = {
  id: string;
  name: string;
  icon: string;
  description?: string | null;
  splash: string;
  discovery_splash?: string | null;
  approximate_member_count: number;
  approximate_presence_count: number;
  features: string[];
  emojis: DiscordEmojiType[];
  banner: string;
  owner_id: string;
  application_id: string | null;
  region: string | null;
  afk_channel_id: string | null;
  afk_timeout: number;
  system_channel_id: string | null;
  widget_enabled: boolean;
  widget_channel_id: string;
  verification_level: number;
  roles: DiscordRoleType[];
  default_message_notifications: number;
  mfa_level: number;
  explicit_content_filter: number;
  max_presences: number | null;
  max_members: number;
  max_video_channel_users: number;
  vanity_url_code: string;
  premium_tier: number;
  premium_subscription_count: number;
  system_channel_flags: number;
  preferred_locale: string;
  rules_channel_id: string | null;
  public_updates_channel_id: string | null;
};
