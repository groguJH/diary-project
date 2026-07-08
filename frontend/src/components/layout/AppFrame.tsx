"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { FaRegCalendarAlt, FaRegEdit, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import AuthModal from "@/src/components/auth/AuthModal";
import BottomNavigation from "./BottomNavigation";
import TopMenu, { type MenuItem } from "./TopMenu";

const menuItems: MenuItem[] = [
  { href: "/", icon: <FaRegEdit />, label: "일기 작성" },
  { href: "/calendar", icon: <FaRegCalendarAlt />, label: "월간 기록" },
];

interface AppFrameProps {
  children: ReactNode;
}

const Shell = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(180deg, var(--color-background) 0%, #ffffff 48rem),
    #ffffff;
`;

const Body = styled.div`
  display: block;
  width: min(100%, var(--layout-max-width));
  margin: 0 auto;
  padding: 2.4rem var(--layout-padding) 5.6rem;

  @media (max-width: 640px) {
    padding-bottom: 10rem;
  }
`;

const Main = styled.main`
  min-width: 0;
`;

export function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const authLabel = session?.user
    ? (session.user.name ?? session.user.email ?? "내 계정")
    : "로그인/회원가입";
  const authImage = session?.user?.image;

  return (
    <Shell>
      <TopMenu
        activePath={pathname}
        authLabel={authLabel}
        items={menuItems}
        onAuthClick={() => setAuthModalOpen(true)}
      />
      <Body>
        <Main>{children}</Main>
      </Body>
      <BottomNavigation
        activePath={pathname}
        authIcon={<FaUserCircle />}
        authImage={authImage}
        authLabel={authLabel}
        items={menuItems}
        onAuthClick={() => setAuthModalOpen(true)}
      />
      <AuthModal onClose={() => setAuthModalOpen(false)} open={authModalOpen} />
    </Shell>
  );
}

export default AppFrame;
