"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

export default function Nav() {
  const router = useRouter();
  return (
    <div>
      <header className="fixed top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary dark:text-white ">
        <div className=" max-w-screen-xl m-auto">
          <div className="mx-4 sm:mx-8 flex h-14 items-center">
            <div className="flex items-center space-x-4 lg:space-x-0  text-black dark:text-white  ">
              {/* <SheetMenu /> */}
              <h1 className="font-bold ">ArcPay</h1>
            </div>
            <div className="flex flex-1 items-center space-x-2 justify-end">
              {/* <UserNav /> */}
              <Button
                onClick={() => router.push("/signin")}
                className=" h-9 font-semibold text-white w-24 bg-zinc-900 hover:bg-transparent hover:text-black dark:text-white"
              >
                Sign-In
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="h-9 font-semibold  bg-zinc-300 text-black w-24  hover:bg-transparent dark:hover:text-white "
              >
                Sign-Up
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
