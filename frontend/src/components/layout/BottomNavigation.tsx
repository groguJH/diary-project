"use client";

import {
  Aside,
  IconWrap,
  Nav,
  NavLink,
  NavList,
  VisuallyHidden,
} from "./BottomNavigation.styles";
import type { MenuItem } from "./TopMenu";

interface BottomNavigationProps {
  items: MenuItem[];
  activePath: string;
}

export function BottomNavigation({ items, activePath }: BottomNavigationProps) {
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
        </NavList>
      </Nav>
    </Aside>
  );
}

export default BottomNavigation;
