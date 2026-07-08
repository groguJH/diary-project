"use client";

import type { ReactNode } from "react";
import {
  Aside,
  AvatarImage,
  IconWrap,
  Nav,
  NavButton,
  NavLink,
  NavList,
  VisuallyHidden,
} from "./BottomNavigation.styles";
import type { MenuItem } from "./TopMenu";

interface BottomNavigationProps {
  items: MenuItem[];
  activePath: string;
  authIcon: ReactNode;
  authImage?: string | null;
  authLabel: string;
  onAuthClick: () => void;
}

export function BottomNavigation({
  items,
  activePath,
  authIcon,
  authImage,
  authLabel,
  onAuthClick,
}: BottomNavigationProps) {
  return (
    <Aside>
      <Nav aria-label="하단 네비게이션">
        <NavList>
          {items.map((item) => {
            const active =
              item.href === "/"
                ? activePath === item.href
                : activePath.startsWith(item.href);

            return (
              <li key={item.href}>
                <NavLink $active={active} aria-label={item.label} href={item.href}>
                  <IconWrap $active={active} aria-hidden="true">
                    {item.icon}
                  </IconWrap>
                  <VisuallyHidden>{item.label}</VisuallyHidden>
                </NavLink>
              </li>
            );
          })}
          <li>
            <NavButton aria-label={authLabel} onClick={onAuthClick} type="button">
              <IconWrap $active={false} aria-hidden="true">
                {authImage ? <AvatarImage alt="" src={authImage} /> : authIcon}
              </IconWrap>
              <VisuallyHidden>{authLabel}</VisuallyHidden>
            </NavButton>
          </li>
        </NavList>
      </Nav>
    </Aside>
  );
}

export default BottomNavigation;
