import type { DiscordConfig } from "../types";

export async function sendDiscordLog({ webhookUrl, embed, content }: DiscordConfig) {
  try {
    const payload: {
      content?: string;
      embeds?: any[];
    } = {
      content: content ?? "",
    };

    if (embed) {
      payload.embeds = [embed];
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to send Discord log:", error);
  }
}