import type { DiscordConfig, DiscordEmbed } from "../types";

export async function sendDiscordLog({ webhookUrl, embed, content }: DiscordConfig): Promise<void> {
  try {
    const payload: {
      content?: string;
      embeds?: DiscordEmbed[];
    } = {
      content: content ?? "",
    };

    if (embed) {
      payload.embeds = [embed];
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to send Discord log:", error);
    throw error;
  }
}