import type {DiscordEmbedBuilder } from "./builder";

export type Provider = "discord" | "slack";

export interface DiscordConfig {
  webhookUrl: string;
  content?: string;
  embed?: DiscordEmbedBuilder;
}

export interface GetLogsOptions {
  provider?: Provider;
  discord?: DiscordConfig;
  slack?: SlackConfig;
}

export interface SlackAttachment {
    pretext?: string;
    color?: string;
    footer_icon?: string;
    footer?: string;
    ts?: number;
  };
  
export interface SlackConfig {
    webhookUrl: string;
    username?: string;
    block?: SlackBlock;
  }

export interface DiscordEmbed {
  color?: number;
  title?: string;
  url?: string;
  author?: {
    name?: string;
    iconURL?: string;
    url?: string;
  };
  description?: string;
  thumbnail?: string;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  image?: string;
  timestamp?: string | number | Date;
  footer?: {
    text?: string;
    iconURL?: string;
  };
};

type SlackTextObject = {
  type: "plain_text" | "mrkdwn";
  text: string;
};

type SlackSectionBlock = {
  type: "section";
  text: SlackTextObject;
};

type SlackContextBlock = {
  type: "context";
  elements: SlackTextObject[];
};

type SlackImageBlock = {
  type: "image";
  image_url: string;
  alt_text: string;
};

type SlackDividerBlock = {
  type: "divider";
};

export type SlackBlock =
  | SlackSectionBlock
  | SlackContextBlock
  | SlackImageBlock
  | SlackDividerBlock;

