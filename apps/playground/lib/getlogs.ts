import GetLogs from "getlogs";

const logger = new GetLogs({
  provider: "discord",
  discord: {
    webhookUrl: process.env.DISCORD_LOG_WEBHOOK!,
  },
});

export default logger;