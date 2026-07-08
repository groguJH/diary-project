import Link from "next/link";
import styled from "styled-components";

export const Aside = styled.aside`
  display: none;

  @media (max-width: 640px) {
    position: fixed;
    z-index: var(--z-header);
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
  }
`;

export const Nav = styled.nav`
  padding: 0.8rem 1.4rem calc(0.8rem + env(safe-area-inset-bottom));
  border: 1px solid var(--color-border);
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(16px);
`;

export const NavList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  min-height: 5.2rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
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

export const NavButton = styled.button`
  display: flex;
  width: 100%;
  min-height: 5.2rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--color-text-soft);
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
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  font-size: 2rem;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
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
