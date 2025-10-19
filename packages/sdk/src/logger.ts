import type { GetLogsOptions, SlackBlock, DiscordEmbed, TelegramConfig } from "./types";
import { sendDiscordLog } from "./providers/discord";
import { sendSlackLog } from "./providers/slack";
import { sendTelegramLog } from "./providers/telegram";

export default class GetLogs {
  private config: GetLogsOptions;

  constructor(config: GetLogsOptions) {
    this.config = config;
  }

  async log({ 
    content, 
    embed, 
    blocks, 
    telegramMessage 
  }: { 
    content?: string; 
    embed?: DiscordEmbed; 
    blocks?: SlackBlock[]; 
    telegramMessage?: string;
  }): Promise<void> {
    switch (this.config.provider) {
      case "discord":
        if (this.config.discord) {
          await sendDiscordLog({
            ...this.config.discord,
            content,
            embed,
          });
        } else {
          console.warn("Discord webhook URL not configured.");
        }
        break;
      case "slack":
        if (this.config.slack) {
          await sendSlackLog({
            ...this.config.slack,
            blocks
          });
        } else {
          console.warn("Slack webhook URL not configured.");
        }
        break;
      case "telegram":
        if (this.config.telegram) {
          await sendTelegramLog({
            ...this.config.telegram,
            message: telegramMessage || content,
          });
        } else {
          console.warn("Telegram bot token or chat ID not configured.");
        }
        break;
      default:
        console.warn("Provider is not initialized!");
    }
  }
}
