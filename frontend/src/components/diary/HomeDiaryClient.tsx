"use client";

import dynamic from "next/dynamic";
import Loading from "@/src/components/common/Loading";

const HomeDiary = dynamic(() => import("./HomeDiary"), {
  ssr: false,
  loading: () => <Loading label="일기 작성 화면을 불러오는 중..." />,
});

export default function HomeDiaryClient() {
  return <HomeDiary />;
}
