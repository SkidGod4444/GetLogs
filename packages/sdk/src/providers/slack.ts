import type { SlackConfig } from "../types";

export async function sendSlackLog({ webhookUrl, username, block }: SlackConfig) {
  try {
    const payload = {
      username,
      block,
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to send Slack log:", error);
  }
}