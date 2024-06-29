"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <div>
      <RecoilRoot>
        <SessionProvider>{children}</SessionProvider>
      </RecoilRoot>
    </div>
  );
}
