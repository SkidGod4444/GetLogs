import type { DiscordConfig } from "../types";
import { Embed, WebhookClient } from "discord.js";

export async function sendDiscordLog({ webhookUrl, embed, content }: DiscordConfig) {
  try {
    const logger = new WebhookClient({ url: webhookUrl });

    const payload: {
      content?: string;
      embeds?: Embed[];
    } = {
      content: content ?? "",
    };

    if (embed) {
      payload.embeds = [embed];
    }

    await logger.send(payload);
  } catch (error) {
    console.error("Failed to send Discord log:", error);
  }
}