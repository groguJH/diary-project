"use client";

import dynamic from "next/dynamic";
import Loading from "@/src/components/common/Loading";

const CalendarStatsDashboard = dynamic(
  () => import("./CalendarStatsDashboard"),
  {
    ssr: false,
    loading: () => <Loading label="월간 기록을 불러오는 중..." />,
  },
);

export default function CalendarStatsDashboardClient() {
  return <CalendarStatsDashboard />;
}
