"use client";

import { ModeToggle } from "../mode-toggle";

export default function Nav() {
  return (
    <div>
      <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary ">
        <div className=" max-w-screen-xl m-auto">
          <div className="mx-4 sm:mx-8 flex h-14 items-center">
            <div className="flex items-center space-x-4 lg:space-x-0 text-white">
              {/* <SheetMenu /> */}
              <h1 className="font-bold">ArcPay</h1>
            </div>
            <div className="flex flex-1 items-center space-x-2 justify-end">
              <ModeToggle />
              {/* <UserNav /> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
