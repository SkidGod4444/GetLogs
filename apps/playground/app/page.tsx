"use client";
import { Button } from "@/components/ui/button";
import logger from "@/lib/getlogs";

export default function Home() {
  const handleOnClick = async () => {
    logger.log()
  }
  return (
    <div className="flex items-center justify-center overflow-hidden w-screen h-screen bg-black">
      <Button className="cursor-pointer" onClick={handleOnClick}>
        Send Logs
      </Button>
    </div>
  );
}
