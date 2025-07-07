import type { SlackConfig } from "../types";
import { WebhookClient } from "discord.js";

export async function sendSlackLog({ webhookUrl, username, attachments }: SlackConfig) {
  try {
    const logger = new WebhookClient({ url: webhookUrl });

    await logger.sendSlackMessage({
      username,
      attachments,
    });
  } catch (error) {
    console.error("Failed to send Slack log:", error);
  }
}