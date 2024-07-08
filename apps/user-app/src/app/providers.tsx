"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <div>
      <RecoilRoot>
        <NextThemesProvider {...props}>
          <SessionProvider>{children}</SessionProvider>
          <Toaster />
        </NextThemesProvider>
      </RecoilRoot>
    </div>
  );
}
