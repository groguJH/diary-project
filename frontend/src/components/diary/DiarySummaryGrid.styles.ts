import styled from "styled-components";

export const SummaryGridRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.div`
  display: grid;
  align-content: start;
  min-height: 11.2rem;
  gap: 0.4rem;
  padding: 1.6rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
`;

export const SummaryLabel = styled.span`
  color: var(--color-text-soft);
  font-size: 1.2rem;
  font-weight: 800;
`;

export const SummaryValue = styled.strong`
  color: var(--color-text);
  font-size: 2rem;
  line-height: 1.25;
`;

export const SummaryMeta = styled.span`
  color: var(--color-text-soft);
  font-size: 1.2rem;
  line-height: 1.4;
`;
