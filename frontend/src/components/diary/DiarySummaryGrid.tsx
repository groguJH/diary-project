import type { ReactNode } from "react";
import {
  SummaryGridRoot,
  SummaryItem,
  SummaryLabel,
  SummaryMeta,
  SummaryValue,
} from "./DiarySummaryGrid.styles";

export interface DiarySummaryItem {
  label: ReactNode;
  value: ReactNode;
  meta?: ReactNode;
}

interface DiarySummaryGridProps {
  items: DiarySummaryItem[];
}

export function DiarySummaryGrid({ items }: DiarySummaryGridProps) {
  return (
    <SummaryGridRoot>
      {items.map((item, index) => (
        <SummaryItem key={`${item.label}-${index}`}>
          <SummaryLabel>{item.label}</SummaryLabel>
          <SummaryValue>{item.value}</SummaryValue>
          {item.meta ? <SummaryMeta>{item.meta}</SummaryMeta> : null}
        </SummaryItem>
      ))}
    </SummaryGridRoot>
  );
}

export default DiarySummaryGrid;
