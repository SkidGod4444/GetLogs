import type { SlackConfig } from "../types";

export async function sendSlackLog({ webhookUrl, username, blocks }: SlackConfig): Promise<void> {
  try {
    const payload: {
      username?: string;
      blocks?: any;
    } = {
      username,
      blocks,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Slack webhook error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to send Slack log:", error);
    throw error;
  }
}