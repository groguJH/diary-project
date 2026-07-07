import Link from "next/link";
import styled from "styled-components";

export const Aside = styled.aside`
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

export const Nav = styled.nav`
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(16px);
`;

export const NavList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  min-height: 5.6rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: ${({ $active }) =>
    $active ? "var(--color-primary-light)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--color-text)" : "var(--color-text-soft)"};
  outline: 0;
  transition:
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  &:hover {
    background: var(--color-surface-soft);
    color: var(--color-text);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.38);
  }
`;

export const IconWrap = styled.span<{ $active: boolean }>`
  display: grid;
  width: 4rem;
  height: 4rem;
  place-items: center;
  border-radius: var(--radius-full);
  background: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-surface-soft)"};
  color: inherit;
  font-size: 2rem;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
