export type Provider = "discord" | "slack" | "telegram";

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
}

export interface DiscordConfig {
  webhookUrl: string;
  content?: string;
  embed?: DiscordEmbed;
}

export interface SlackAttachment {
  pretext?: string;
  color?: string;
  footer_icon?: string;
  footer?: string;
  ts?: number;
}

export interface SlackConfig {
  webhookUrl: string;
  username?: string;
  blocks?: SlackBlock[];
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
  message?: string;
  parseMode?: "HTML" | "Markdown" | "MarkdownV2";
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
}

export interface GetLogsOptions {
  provider?: Provider;
  discord?: DiscordConfig;
  slack?: SlackConfig;
  telegram?: TelegramConfig;
}

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

