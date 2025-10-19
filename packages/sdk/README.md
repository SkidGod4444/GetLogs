# GetLogs SDK

A type-safe logging SDK that supports Discord, Slack, and Telegram webhooks for sending structured logs and notifications.

## Features

- **Type-safe**: Full TypeScript support with strict typing
- **Multiple Providers**: Support for Discord, Slack, and Telegram
- **Builder Pattern**: Fluent API for creating rich messages
- **Error Handling**: Comprehensive error handling with proper error propagation
- **Modern**: Built with modern TypeScript and ES modules

## Installation

```bash
bun install getlogs-sdk
```

## Usage

### Discord

```typescript
import { GetLogs, DiscordEmbedBuilder } from "getlogs-sdk";

const logger = new GetLogs({
  provider: "discord",
  discord: {
    webhookUrl: "https://discord.com/api/webhooks/your-webhook-url",
  },
});

const embed = new DiscordEmbedBuilder()
  .setTitle("Error Log")
  .setDescription("An error occurred in the application")
  .setColor("#FF0000")
  .addField("Error", "Database connection failed", false)
  .addField("Timestamp", new Date().toISOString(), true);

await logger.log({ embed });
```

### Slack

```typescript
import { GetLogs, SlackEmbedBuilder } from "getlogs-sdk";

const logger = new GetLogs({
  provider: "slack",
  slack: {
    webhookUrl: "https://hooks.slack.com/services/your-webhook-url",
    username: "GetLogs Bot",
  },
});

const blocks = new SlackEmbedBuilder()
  .addSection("Error Log", true)
  .addDivider()
  .addContext(["Error: Database connection failed", `Timestamp: ${new Date().toISOString()}`], true);

await logger.log({ block: blocks });
```

### Telegram

```typescript
import { GetLogs, TelegramMessageBuilder } from "getlogs-sdk";

const logger = new GetLogs({
  provider: "telegram",
  telegram: {
    botToken: "your-bot-token",
    chatId: "your-chat-id",
    parseMode: "HTML",
  },
});

const message = new TelegramMessageBuilder()
  .setParseMode("HTML")
  .addBold("Error Log")
  .addLineBreak()
  .setText("An error occurred in the application")
  .addLineBreak()
  .addCode("Database connection failed");

await logger.log({ telegramMessage: message.toJSON().message });
```

## API Reference

### GetLogs Class

The main logger class that handles sending logs to different providers.

#### Constructor

```typescript
new GetLogs(config: GetLogsOptions)
```

#### Methods

- `log(options: LogOptions): Promise<void>` - Send a log message

### Builder Classes

#### DiscordEmbedBuilder

- `setTitle(title: string): this`
- `setDescription(description: string): this`
- `setColor(color: number | string): this`
- `setURL(url: string): this`
- `setAuthor(name: string, iconURL?: string, url?: string): this`
- `setThumbnail(url: string): this`
- `setImage(url: string): this`
- `setFooter(text: string, iconURL?: string): this`
- `addField(name: string, value: string, inline?: boolean): this`

#### SlackEmbedBuilder

- `addSection(text: string, markdown?: boolean): this`
- `addDivider(): this`
- `addContext(elements: string[], markdown?: boolean): this`
- `addImage(image_url: string, alt_text: string): this`

#### TelegramMessageBuilder

- `setText(text: string): this`
- `setParseMode(mode: "HTML" | "Markdown" | "MarkdownV2"): this`
- `setDisableWebPagePreview(disable: boolean): this`
- `setDisableNotification(disable: boolean): this`
- `addBold(text: string): this`
- `addItalic(text: string): this`
- `addCode(text: string): this`
- `addPreformatted(text: string, language?: string): this`
- `addLink(text: string, url: string): this`
- `addLineBreak(): this`

## Development

To install dependencies:

```bash
bun install
```

To build:

```bash
bun run build
```

To run in development mode:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
