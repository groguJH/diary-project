"use client";

import { useMemo, useState } from "react";
import { Calendar } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { FaTimes } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ScrollTopFloatButton from "@/src/components/common/ScrollTopFloatButton";
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
  DateNumber,
  Description,
  DetailBody,
  DetailCloseButton,
  DetailActionButton,
  DetailActions,
  DetailDate,
  DetailEditField,
  DetailEditInput,
  DetailEditSelect,
  DetailEditTextarea,
  DetailEntry,
  DetailHeader,
  DetailMetaGrid,
  DetailMetaItem,
  DetailOverlay,
  DetailPanel,
  DetailText,
  DetailTitle,
  EmptyDetail,
  Hero,
  HeroContent,
  MoodPill,
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
import {
  getMoodLabel,
  moodOptions,
} from "@/src/components/diary/EmotionRadioGroup";
import { diaryEntriesState } from "@/src/store/diaryStore";
import { useRecoilState } from "@/src/store/recoilCompat";
import type { DiaryEntry, DiaryMood } from "@/src/types/diary";

const demoEntries: DiaryEntry[] = [
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(2).format("YYYY-MM-DD"),
    id: "demo-1",
    mood: "calm",
    title: "월간 기록 샘플",
    author: "샘플 작성자",
  },
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(8).format("YYYY-MM-DD"),
    id: "demo-2",
    mood: "happy",
    title: "좋았던 날",
    author: "샘플 작성자",
  },
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(8).format("YYYY-MM-DD"),
    id: "demo-3",
    mood: "tired",
    title: "바빴던 날",
    author: "샘플 작성자",
  },
  {
    content: "샘플 일기입니다.",
    createdAt: new Date().toISOString(),
    date: dayjs().date(17).format("YYYY-MM-DD"),
    id: "demo-4",
    mood: "sad",
    title: "흐린 날",
    author: "샘플 작성자",
  },
];

function isSameMonth(date: string, monthKey: string) {
  return date.startsWith(monthKey);
}

type EditDraft = Pick<DiaryEntry, "content" | "mood" | "title">;

export function CalendarStatsDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<EditDraft>({
    content: "",
    mood: "calm",
    title: "",
  });
  const [demoEntryList, setDemoEntryList] = useState(demoEntries);
  const { data: session } = useSession();
  const [savedEntries, setSavedEntries] = useRecoilState(diaryEntriesState);
  const entries = savedEntries.length ? savedEntries : demoEntryList;
  const fallbackAuthor = session?.user?.name ?? session?.user?.email ?? "나";

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
  const entriesByDate = useMemo(() => {
    return monthlyEntries.reduce<Record<string, DiaryEntry[]>>((acc, entry) => {
      acc[entry.date] = [...(acc[entry.date] ?? []), entry];
      return acc;
    }, {});
  }, [monthlyEntries]);
  const selectedDateEntries = selectedDate
    ? (entriesByDate[selectedDate] ?? [])
    : [];
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
  const handleCalendarSelect = (date: Dayjs) => {
    const dateKey = date.format("YYYY-MM-DD");

    setSelectedMonth(date);
    setSelectedDate(countByDate[dateKey] ? dateKey : null);
  };
  const handlePanelChange = (date: Dayjs) => {
    setSelectedMonth(date);
    setSelectedDate(null);
    setEditingEntryId(null);
  };
  const updateEntries = (
    updater: (currentEntries: DiaryEntry[]) => DiaryEntry[],
  ) => {
    if (savedEntries.length) {
      setSavedEntries(updater);
      return;
    }

    setDemoEntryList(updater);
  };
  const handleCloseDetail = () => {
    setSelectedDate(null);
    setEditingEntryId(null);
  };
  const handleStartEdit = (entry: DiaryEntry) => {
    setEditingEntryId(entry.id);
    setEditDraft({
      content: entry.content,
      mood: entry.mood,
      title: entry.title,
    });
  };
  const handleSaveEdit = (entryId: string) => {
    if (!editDraft.title.trim() || !editDraft.content.trim()) {
      return;
    }

    updateEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              content: editDraft.content.trim(),
              mood: editDraft.mood,
              title: editDraft.title.trim(),
            }
          : entry,
      ),
    );
    setEditingEntryId(null);
  };
  const handleDeleteEntry = (entryId: string) => {
    updateEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId),
    );

    if (selectedDateEntries.length <= 1) {
      setSelectedDate(null);
    }

    if (editingEntryId === entryId) {
      setEditingEntryId(null);
    }
  };

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
                fullCellRender={(current, info) => {
                  if (info.type !== "date") {
                    return info.originNode;
                  }

                  const dateKey = current.format("YYYY-MM-DD");
                  const count = countByDate[dateKey] ?? 0;
                  const isCurrentMonth = current.isSame(selectedMonth, "month");
                  const isActive = selectedDate === dateKey;

                  return (
                    <DateCell
                      $active={isActive}
                      $hasEntries={Boolean(count)}
                      $muted={!isCurrentMonth}
                    >
                      <DateNumber>{current.format("DD")}</DateNumber>
                      {count ? <CountBadge>{count}개</CountBadge> : null}
                    </DateCell>
                  );
                }}
                onPanelChange={handlePanelChange}
                onSelect={handleCalendarSelect}
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
                    cursor={false}
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

      <DetailOverlay
        $open={Boolean(selectedDate)}
        aria-hidden={!selectedDate}
        onClick={handleCloseDetail}
      />
      <DetailPanel $open={Boolean(selectedDate)} aria-label="선택한 날짜 일기">
        <DetailHeader>
          <div>
            <DetailDate>
              {selectedDate
                ? dayjs(selectedDate).format("YYYY년 M월 D일")
                : "선택한 날짜"}
            </DetailDate>
            <DetailTitle>나의 그날 기록</DetailTitle>
          </div>
          <DetailCloseButton
            aria-label="일기 상세 닫기"
            onClick={handleCloseDetail}
            type="button"
          >
            <FaTimes aria-hidden="true" />
          </DetailCloseButton>
        </DetailHeader>

        <DetailBody>
          {selectedDateEntries.length ? (
            selectedDateEntries.map((entry) => {
              const isEditing = editingEntryId === entry.id;

              return (
                <DetailEntry key={entry.id}>
                  {isEditing ? (
                    <DetailEditField>
                      제목
                      <DetailEditInput
                        onChange={(event) =>
                          setEditDraft((current) => ({
                            ...current,
                            title: event.target.value,
                          }))
                        }
                        value={editDraft.title}
                      />
                    </DetailEditField>
                  ) : (
                    <DetailTitle as="h3">{entry.title}</DetailTitle>
                  )}
                  <DetailMetaGrid>
                    <DetailMetaItem>
                      <span>작성자</span>
                      <strong>{entry.author ?? fallbackAuthor}</strong>
                    </DetailMetaItem>
                    <DetailMetaItem>
                      <span>날짜</span>
                      <strong>{entry.date}</strong>
                    </DetailMetaItem>
                    <DetailMetaItem>
                      <span>감정</span>
                      {isEditing ? (
                        <DetailEditSelect
                          onChange={(event) =>
                            setEditDraft((current) => ({
                              ...current,
                              mood: event.target.value as DiaryMood,
                            }))
                          }
                          value={editDraft.mood}
                        >
                          {moodOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </DetailEditSelect>
                      ) : (
                        <MoodPill $mood={entry.mood}>
                          {getMoodLabel(entry.mood)}
                        </MoodPill>
                      )}
                    </DetailMetaItem>
                  </DetailMetaGrid>
                  {isEditing ? (
                    <DetailEditField>
                      내용
                      <DetailEditTextarea
                        onChange={(event) =>
                          setEditDraft((current) => ({
                            ...current,
                            content: event.target.value,
                          }))
                        }
                        value={editDraft.content}
                      />
                    </DetailEditField>
                  ) : (
                    <DetailText>{entry.content}</DetailText>
                  )}
                  <DetailActions>
                    {isEditing ? (
                      <>
                        <DetailActionButton
                          onClick={() => handleSaveEdit(entry.id)}
                          type="button"
                        >
                          저장
                        </DetailActionButton>
                        <DetailActionButton
                          $variant="ghost"
                          onClick={() => setEditingEntryId(null)}
                          type="button"
                        >
                          취소
                        </DetailActionButton>
                      </>
                    ) : (
                      <>
                        <DetailActionButton
                          onClick={() => handleStartEdit(entry)}
                          type="button"
                        >
                          수정하기
                        </DetailActionButton>
                        <DetailActionButton
                          $variant="danger"
                          onClick={() => handleDeleteEntry(entry.id)}
                          type="button"
                        >
                          삭제하기
                        </DetailActionButton>
                      </>
                    )}
                  </DetailActions>
                </DetailEntry>
              );
            })
          ) : (
            <EmptyDetail>선택한 날짜에 저장된 일기가 없습니다.</EmptyDetail>
          )}
        </DetailBody>
      </DetailPanel>

      <ScrollTopFloatButton />
    </Page>
  );
}

export default CalendarStatsDashboard;
