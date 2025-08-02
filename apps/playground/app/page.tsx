"use client";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/getlogs";
import { DiscordEmbedBuilder } from "getlogs";

export default function Home() {
  const handleOnClick = async () => {
    const embed = new DiscordEmbedBuilder().setDescription("Hey bby").setColor("#991b1b")
    logger.log({ embed: embed })
  }
  return (
    <div className="flex items-center justify-center overflow-hidden w-screen h-screen bg-black">
      <Button className="cursor-pointer" onClick={handleOnClick}>
        Send Logs
      </Button>
    </div>
  );
}
