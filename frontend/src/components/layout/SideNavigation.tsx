"use client";

import Link from "next/link";
import styled from "styled-components";
import type { MenuItem } from "./TopMenu";

interface SideNavigationProps {
  items: MenuItem[];
  activePath: string;
}

const Aside = styled.aside`
  display: none;

  @media (max-width: 640px) {
    position: fixed;
    z-index: var(--z-header);
    right: 1.2rem;
    bottom: 1.2rem;
    left: 1.2rem;
    display: block;
  }
`;

const Nav = styled.nav`
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(16px);
`;

const NavList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  min-height: 5.2rem;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-full);
  background: ${({ $active }) =>
    $active ? "var(--color-primary-light)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--color-text)" : "var(--color-text-soft)"};
  font-weight: 800;
  text-align: center;

  &:hover {
    background: var(--color-surface-soft);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.38);
  }
`;

export function SideNavigation({ items, activePath }: SideNavigationProps) {
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
                <NavLink $active={active} href={item.href}>
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </NavList>
      </Nav>
    </Aside>
  );
}

export default SideNavigation;
