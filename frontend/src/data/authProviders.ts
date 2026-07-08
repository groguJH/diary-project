import { FaGoogle } from "react-icons/fa";
import type { IconType } from "react-icons";

export type SocialProviderId = "google";

export interface SocialAuthProvider {
  id: SocialProviderId;
  label: string;
  icon: IconType;
}

export const socialAuthProviders: SocialAuthProvider[] = [
  {
    icon: FaGoogle,
    id: "google",
    label: "Google",
  },
];
