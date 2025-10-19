import type { TelegramConfig } from "../types";

export async function sendTelegramLog({ 
  botToken, 
  chatId, 
  message, 
  parseMode = "HTML", 
  disableWebPagePreview = false, 
  disableNotification = false 
}: TelegramConfig): Promise<void> {
  try {
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const payload = {
      chat_id: chatId,
      text: message || "",
      parse_mode: parseMode,
      disable_web_page_preview: disableWebPagePreview,
      disable_notification: disableNotification,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Telegram API error: ${response.status} - ${errorData.description || response.statusText}`);
    }

    const result = await response.json();
    if (!result.ok) {
      throw new Error(`Telegram API error: ${result.description || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Failed to send Telegram log:", error);
    throw error;
  }
}
