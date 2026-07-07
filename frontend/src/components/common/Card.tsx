import type { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

const CardRoot = styled.div`
  display: grid;
  gap: 1.6rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
`;

const TitleGroup = styled.div`
  min-width: 0;
`;

const Heading = styled.h2`
  margin: 0;
  color: var(--color-text);
  font-size: 2rem;
  line-height: 1.35;
`;

const Description = styled.p`
  margin: 0.6rem 0 0;
  color: var(--color-text-soft);
  font-size: 1.3rem;
`;

export function Card({
  heading,
  description,
  action,
  children,
  ...props
}: CardProps) {
  const hasHeader = Boolean(heading || description || action);

  return (
    <CardRoot {...props}>
      {hasHeader ? (
        <CardHeader>
          <TitleGroup>
            {heading ? <Heading>{heading}</Heading> : null}
            {description ? <Description>{description}</Description> : null}
          </TitleGroup>
          {action}
        </CardHeader>
      ) : null}
      {children}
    </CardRoot>
  );
}

export default Card;
