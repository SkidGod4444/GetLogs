"use client";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/getlogs";
import { DiscordEmbedBuilder } from "getlogs";

export default function Home() {
  const handleOnClick = async () => {
    const embed = new DiscordEmbedBuilder().setDescription("Hey bby").setColor("#991b1b").setAuthor('Saidev Dhal', 'https://i.pinimg.com/736x/18/ab/a2/18aba2f2f95be70d3a4e5237791a9ded.jpg', 'https://devwtf.in')
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
