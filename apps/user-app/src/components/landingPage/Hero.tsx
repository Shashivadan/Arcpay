"use client";

import BlurIn from "../magicui/blur-in";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className=" flex flex-col gap-4 items-center justify-center px-4">
      <BlurIn
        word="Background lights are cool you know."
        className="text-3xl md:text-7xl font-bold dark:text-white text-center"
      ></BlurIn>
      <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        And this, is chemical burn.
      </div>
      <Button className="bg-black dark:bg-white font-bold dark:text-black px-4 py-2">
        Debug now
      </Button>
    </div>
  );
}
