"use client";

import type { ReactNode } from "react";
import { RecoilRoot } from "@/src/store/recoilCompat";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default AppProviders;
