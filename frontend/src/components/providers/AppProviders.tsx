"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { RecoilRoot } from "@/src/store/recoilCompat";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}

export default AppProviders;
