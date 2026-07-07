"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { FaRegCalendarAlt, FaRegEdit } from "react-icons/fa";
import styled from "styled-components";
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

  return (
    <Shell>
      <TopMenu activePath={pathname} items={menuItems} />
      <Body>
        <Main>{children}</Main>
      </Body>
      <BottomNavigation activePath={pathname} items={menuItems} />
    </Shell>
  );
}

export default AppFrame;
