"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";

export interface MenuItem {
  href: string;
  icon: ReactNode;
  label: string;
}

interface TopMenuProps {
  items: MenuItem[];
  activePath: string;
}

const Header = styled.header`
  position: sticky;
  z-index: var(--z-header);
  top: 0;
  border-bottom: 1px solid var(--color-border);
  background: rgba(255, 253, 243, 0.9);
  backdrop-filter: blur(16px);
`;

const Inner = styled.div`
  display: grid;
  width: min(100%, var(--layout-max-width));
  min-height: var(--header-height);
  grid-template-columns: auto minmax(0, 1fr);
  gap: 2.4rem;
  align-items: center;
  margin: 0 auto;
  padding: 0 var(--layout-padding);

  @media (max-width: 768px) {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1.2rem;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  min-width: 0;
  align-items: center;
  color: var(--color-text);
  font-size: 1.9rem;
  font-weight: 900;
  outline: 0;

  &:focus-visible {
    border-radius: var(--radius-sm);
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.38);
  }
`;

const Nav = styled.nav`
  min-width: 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  min-height: 4rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius-full);
  background: ${({ $active }) =>
    $active ? "var(--color-primary-light)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--color-text)" : "var(--color-text-soft)"};
  font-weight: 800;
  white-space: nowrap;

  &:hover {
    background: var(--color-surface-soft);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.38);
  }
`;

export function TopMenu({ items, activePath }: TopMenuProps) {
  return (
    <Header>
      <Inner>
        <Brand href="/">Diary Project</Brand>
        <Nav aria-label="상단 메뉴">
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
      </Inner>
    </Header>
  );
}

export default TopMenu;
