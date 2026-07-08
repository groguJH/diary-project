import type { Metadata } from "next";
import RegisterPage from "@/src/components/auth/RegisterPage";

export const metadata: Metadata = {
  title: "회원가입 | Diary Project",
};

export default function Page() {
  return <RegisterPage />;
}
