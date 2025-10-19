import { GetLogs, DiscordEmbedBuilder, SlackEmbedBuilder, TelegramMessageBuilder } from "./src/index";

// Example usage demonstrating all three providers with type safety

console.log("🚀 GetLogs SDK Examples - All Providers\n");

// ========================================
// DISCORD PROVIDER EXAMPLE
// ========================================
console.log("📱 Discord Provider Example:");

const discordLogger = new GetLogs({
  provider: "discord",
  discord: {
    webhookUrl: "https://discord.com/api/webhooks/your-webhook-url",
  },
});

const discordEmbed = new DiscordEmbedBuilder()
  .setTitle("🚨 Application Error")
  .setDescription("A critical error occurred in the application")
  .setColor("#FF0000") // Red color
  .setAuthor("GetLogs Bot", "https://example.com/bot-icon.png", "https://example.com")
  .setThumbnail("https://example.com/error-icon.png")
  .addField("Error Type", "Database Connection Failed", true)
  .addField("Severity", "Critical", true)
  .addField("Timestamp", new Date().toISOString(), false)
  .addField("Stack Trace", "```\nError: Connection timeout\n    at Database.connect()\n    at App.initialize()\n```", false)
  .setFooter("GetLogs SDK", "https://example.com/footer-icon.png");

console.log("Discord Embed:", JSON.stringify(discordEmbed.toJSON(), null, 2));

// Uncomment to actually send to Discord:
// await discordLogger.log({ embed: discordEmbed });

// ========================================
// SLACK PROVIDER EXAMPLE
// ========================================
console.log("\n💬 Slack Provider Example:");

const slackLogger = new GetLogs({
  provider: "slack",
  slack: {
    webhookUrl: "https://hooks.slack.com/services/your-webhook-url",
    username: "GetLogs Bot",
  },
});

const slackBlocks = new SlackEmbedBuilder()
  .addSection("*🚨 Application Error*", true)
  .addSection("A critical error occurred in the application", true)
  .addDivider()
  .addSection("*Error Details:*", true)
  .addContext([
    "• *Error Type:* Database Connection Failed",
    "• *Severity:* Critical", 
    `• *Timestamp:* ${new Date().toISOString()}`
  ], true)
  .addDivider()
  .addSection("*Stack Trace:*", true)
  .addSection("```\nError: Connection timeout\n    at Database.connect()\n    at App.initialize()\n```", true);

console.log("Slack Blocks:", JSON.stringify(slackBlocks.toJSON(), null, 2));

// Uncomment to actually send to Slack:
// await slackLogger.log({ block: slackBlocks });

// ========================================
// TELEGRAM PROVIDER EXAMPLE
// ========================================
console.log("\n📱 Telegram Provider Example:");

const telegramLogger = new GetLogs({
  provider: "telegram",
  telegram: {
    botToken: "your-bot-token",
    chatId: "your-chat-id",
    parseMode: "HTML",
    disableWebPagePreview: true,
    disableNotification: false,
  },
});

const telegramMessage = new TelegramMessageBuilder()
  .setParseMode("HTML")
  .addBold("🚨 Application Error")
  .addLineBreak()
  .addLineBreak()
  .setText("A critical error occurred in the application")
  .addLineBreak()
  .addLineBreak()
  .addBold("Error Details:")
  .addLineBreak()
  .addCode("Error Type: Database Connection Failed")
  .addLineBreak()
  .addCode("Severity: Critical")
  .addLineBreak()
  .addCode(`Timestamp: ${new Date().toISOString()}`)
  .addLineBreak()
  .addLineBreak()
  .addBold("Stack Trace:")
  .addLineBreak()
  .addPreformatted("Error: Connection timeout\n    at Database.connect()\n    at App.initialize()", "javascript");

console.log("Telegram Message:", JSON.stringify(telegramMessage.toJSON(), null, 2));

// Uncomment to actually send to Telegram:
// await telegramLogger.log({ telegramMessage: telegramMessage.toJSON().message });

// ========================================
// ADVANCED EXAMPLES
// ========================================
console.log("\n🔧 Advanced Examples:");

// Example 1: Success Log with Discord
const successEmbed = new DiscordEmbedBuilder()
  .setTitle("✅ Deployment Successful")
  .setDescription("Application deployed successfully to production")
  .setColor("#00FF00") // Green color
  .addField("Version", "v1.2.3", true)
  .addField("Environment", "Production", true)
  .addField("Duration", "2m 34s", true)
  .setFooter("Deployment Bot");

console.log("Success Embed:", JSON.stringify(successEmbed.toJSON(), null, 2));

// Example 2: Info Log with Slack
const infoBlocks = new SlackEmbedBuilder()
  .addSection("*ℹ️ System Information*", true)
  .addContext([
    "• *CPU Usage:* 45%",
    "• *Memory Usage:* 2.1GB / 8GB",
    "• *Disk Usage:* 156GB / 500GB",
    "• *Uptime:* 7 days, 12 hours"
  ], true);

console.log("Info Blocks:", JSON.stringify(infoBlocks.toJSON(), null, 2));

// Example 3: Warning Log with Telegram
const warningMessage = new TelegramMessageBuilder()
  .setParseMode("MarkdownV2")
  .addBold("⚠️ High Memory Usage Warning")
  .addLineBreak()
  .addLineBreak()
  .setText("Memory usage is above 80%")
  .addLineBreak()
  .addCode("Current Usage: 6.4GB / 8GB")
  .addLineBreak()
  .addCode("Threshold: 6.4GB")
  .addLineBreak()
  .addItalic("Please check your application for memory leaks");

console.log("Warning Message:", JSON.stringify(warningMessage.toJSON(), null, 2));

// ========================================
// USAGE WITH DIFFERENT CONTENT TYPES
// ========================================
console.log("\n📝 Different Content Types:");

// Simple text message for Telegram
const simpleTelegramLogger = new GetLogs({
  provider: "telegram",
  telegram: {
    botToken: "your-bot-token",
    chatId: "your-chat-id",
    parseMode: "Markdown",
  },
});

// Simple text message
const simpleMessage = "Hello! This is a simple log message from GetLogs SDK.";

// Uncomment to send simple message:
// await simpleTelegramLogger.log({ telegramMessage: simpleMessage });

// Discord with just content (no embed)
const discordContentLogger = new GetLogs({
  provider: "discord",
  discord: {
    webhookUrl: "https://discord.com/api/webhooks/your-webhook-url",
  },
});

// Uncomment to send simple content:
// await discordContentLogger.log({ content: "Simple Discord message" });

console.log("\n✨ All examples completed! Uncomment the await statements to actually send messages.");
console.log("🔧 Remember to replace the webhook URLs, bot tokens, and chat IDs with your actual values.");