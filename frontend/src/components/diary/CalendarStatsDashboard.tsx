"use client";

import { useMemo, useState } from "react";
import { Calendar } from "antd";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CalendarWrap,
  ChartBox,
  CountBadge,
  DashboardCard,
  DashboardContent,
  DashboardDescription,
  DashboardHeading,
  DashboardHeadingGroup,
  DashboardStack,
  DateCell,
  Description,
  Hero,
  HeroContent,
  Page,
  RecentDate,
  RecentItem,
  RecentList,
  RecentTitle,
  Title,
} from "@/src/components/diary/CalendarStatsDashboard.styles";
import DiarySummaryGrid, {
  type DiarySummaryItem,
} from "@/src/components/diary/DiarySummaryGrid";
import DiaryWriteFloatButton from "@/src/components/diary/DiaryWriteFloatButton";
import { getMoodLabel } from "@/src/components/diary/EmotionRadioGroup";
import { diaryEntriesState } from "@/src/store/diaryStore";
import { useRecoilValue } from "@/src/store/recoilCompat";
import type { DiaryEntry, DiaryMood } from "@/src/types/diary";

const demoEntries: DiaryEntry[] = [
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(2).format("YYYY-MM-DD"),
    id: "demo-1",
    mood: "calm",
    title: "월간 기록 샘플",
  },
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(8).format("YYYY-MM-DD"),
    id: "demo-2",
    mood: "happy",
    title: "좋았던 날",
  },
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(8).format("YYYY-MM-DD"),
    id: "demo-3",
    mood: "tired",
    title: "바빴던 날",
  },
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(17).format("YYYY-MM-DD"),
    id: "demo-4",
    mood: "sad",
    title: "흐린 날",
  },
];

function isSameMonth(date: string, monthKey: string) {
  return date.startsWith(monthKey);
}

export function CalendarStatsDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const savedEntries = useRecoilValue(diaryEntriesState);
  const entries = savedEntries.length ? savedEntries : demoEntries;

  const monthKey = selectedMonth.format("YYYY-MM");
  const monthlyEntries = useMemo(
    () => entries.filter((entry) => isSameMonth(entry.date, monthKey)),
    [entries, monthKey],
  );
  const countByDate = useMemo(() => {
    return monthlyEntries.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.date] = (acc[entry.date] ?? 0) + 1;
      return acc;
    }, {});
  }, [monthlyEntries]);
  const chartData = useMemo(() => {
    const daysInMonth = selectedMonth.daysInMonth();

    return Array.from({ length: daysInMonth }, (_, index) => {
      const date = selectedMonth.date(index + 1).format("YYYY-MM-DD");

      return {
        count: countByDate[date] ?? 0,
        day: `${index + 1}`,
      };
    });
  }, [countByDate, selectedMonth]);

  const totalCount = monthlyEntries.length;
  const totalCharacters = useMemo(
    () =>
      monthlyEntries.reduce(
        (sum, entry) => sum + entry.content.trim().length,
        0,
      ),
    [monthlyEntries],
  );
  const averageCharacters = totalCount
    ? Math.round(totalCharacters / totalCount)
    : 0;
  const dominantMood = useMemo(() => {
    if (!monthlyEntries.length) {
      return null;
    }

    const moodCounts = monthlyEntries.reduce<
      Partial<Record<DiaryMood, number>>
    >((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] ?? 0) + 1;
      return acc;
    }, {});

    return (Object.entries(moodCounts) as Array<[DiaryMood, number]>).sort(
      (a, b) => b[1] - a[1],
    )[0];
  }, [monthlyEntries]);
  const dominantMoodLabel = dominantMood
    ? getMoodLabel(dominantMood[0])
    : "기록 없음";
  const dominantMoodCount = dominantMood?.[1] ?? 0;
  const summaryItems: DiarySummaryItem[] = [
    {
      label: "대표 감정",
      meta: dominantMoodCount
        ? `${dominantMoodCount}번 가장 많이 선택`
        : "기록 후 표시",
      value: dominantMoodLabel,
    },
    {
      label: "평균 글자 수",
      meta: totalCount ? `총 ${totalCharacters}자` : "작성 후 집계",
      value: `${averageCharacters}자`,
    },
    {
      label: "전체 기록",
      meta: savedEntries.length ? "저장된 전체 일기" : "샘플 데이터 표시 중",
      value: `${entries.length}개`,
    },
  ];

  return (
    <Page>
      <Hero>
        <HeroContent>
          <Title>월간 달력</Title>
          <Description
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -28 }}
            transition={{ delay: 0.15, duration: 1.05, ease: "easeOut" }}
          >
            달력으로 일기를 쓴 날짜를 한눈에 확인하고, 그래프로 선택한 월의 기록
            흐름을 비교해볼 수 있습니다.
          </Description>
        </HeroContent>
      </Hero>

      <DiarySummaryGrid items={summaryItems} />

      <DashboardStack>
        <DashboardCard>
          <DashboardContent $wide>
            <DashboardHeadingGroup>
              <DashboardHeading>월간 달력</DashboardHeading>
              <DashboardDescription>
                일기를 작성한 날짜에 배지가 표시됩니다.
              </DashboardDescription>
            </DashboardHeadingGroup>
            <CalendarWrap>
              <Calendar
                cellRender={(current, info) => {
                  if (info.type !== "date") {
                    return info.originNode;
                  }

                  const dateKey = current.format("YYYY-MM-DD");
                  const count = countByDate[dateKey] ?? 0;

                  return (
                    <DateCell>
                      {info.originNode}
                      {count ? <CountBadge>{count}개</CountBadge> : null}
                    </DateCell>
                  );
                }}
                onPanelChange={(date) => setSelectedMonth(date)}
                onSelect={(date) => setSelectedMonth(date)}
                value={selectedMonth}
              />
            </CalendarWrap>
          </DashboardContent>
        </DashboardCard>

        <DashboardCard>
          <DashboardContent>
            <DashboardHeadingGroup>
              <DashboardHeading>일별 작성 횟수</DashboardHeading>
              <DashboardDescription>
                선택한 월의 날짜별 작성 횟수입니다.
              </DashboardDescription>
            </DashboardHeadingGroup>
            <ChartBox>
              <ResponsiveContainer height="100%" width="100%">
                <BarChart data={chartData}>
                  <CartesianGrid stroke="#f1e6c8" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#7c705f", fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#7c705f", fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}개`, "작성 횟수"]}
                    labelFormatter={(label) =>
                      `${selectedMonth.format("M")}월 ${label}일`
                    }
                  />
                  <Bar
                    dataKey="count"
                    fill="#ffd86b"
                    name="작성 횟수"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>
          </DashboardContent>
        </DashboardCard>
      </DashboardStack>

      <DashboardCard>
        <DashboardContent>
          <DashboardHeadingGroup>
            <DashboardHeading>최근 일기</DashboardHeading>
            <DashboardDescription>
              저장된 일기 중 최근 5개입니다.
            </DashboardDescription>
          </DashboardHeadingGroup>
          <RecentList>
            {entries.slice(0, 5).map((entry) => (
              <RecentItem key={entry.id}>
                <RecentTitle>{entry.title}</RecentTitle>
                <RecentDate>{entry.date}</RecentDate>
              </RecentItem>
            ))}
          </RecentList>
        </DashboardContent>
      </DashboardCard>

      <DiaryWriteFloatButton tooltip="홈에서 일기 작성하기" />
    </Page>
  );
}

export default CalendarStatsDashboard;
