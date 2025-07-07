import type { Embed } from "discord.js";

export type Provider = "discord" | "slack";

export interface DiscordConfig {
  webhookUrl: string;
  content?: string;
  embed?: Embed;
}

export interface GetLogsOptions {
  provider?: Provider;
  discord?: DiscordConfig;
  slack?: SlackConfig;
}

type SlackAttachment = {
    pretext?: string;
    color?: string;
    footer_icon?: string;
    footer?: string;
    ts?: number;
  };
  
export interface SlackConfig {
    webhookUrl: string;
    username?: string;
    attachments?: SlackAttachment[];
  }