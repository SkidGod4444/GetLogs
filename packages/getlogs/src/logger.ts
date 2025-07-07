import type { GetLogsOptions } from "./types";
import { sendDiscordLog } from "./providers/discord";
import { sendSlackLog } from "./providers/slack";

export default class GetLogs {
  private config: GetLogsOptions;

  constructor(config: GetLogsOptions) {
    this.config = config;
  }

  async log() {
    switch (this.config.provider) {
    case "discord":
        if (this.config.discord) {
          await sendDiscordLog(this.config.discord);
        } else {
          console.warn("Discord webhook URL not configured.");
        }
        break;
    case "slack":
            if (this.config.slack) {
              await sendSlackLog(this.config.slack);
            } else {
              console.warn("Slack webhook URL not configured.");
            }
            break;
      default:
        console.warn("Provider is not intialised!");
    }
  }


}