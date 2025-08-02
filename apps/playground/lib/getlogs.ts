
import { GetLogs } from "getlogs";

const logger = new GetLogs({
  provider: "discord",
  discord: {
    webhookUrl: 'https://discord.com/api/webhooks/1391858316958760980/QiAeuVv1k8BjGCt8QkEd2MHuJy56LbtB5Bjk1lCLGo9V4tdhgv8YvDAM9f77yEHArfhv',
  },
});

export {logger};