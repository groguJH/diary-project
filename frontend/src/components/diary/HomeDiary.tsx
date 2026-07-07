"use client";

import { type FormEvent, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { Button } from "@/src/components/common/Button";
import Input from "@/src/components/common/Input";
import Textarea from "@/src/components/common/Textarea";
import DiaryWriteFloatButton from "@/src/components/diary/DiaryWriteFloatButton";
import EmotionRadioGroup from "@/src/components/diary/EmotionRadioGroup";
import {
  Actions,
  Description,
  Feedback,
  FieldGrid,
  Form,
  Hero,
  HeroContent,
  Page,
  PromptBody,
  PromptLabel,
  PromptMemo,
  PromptRefreshButton,
  PromptText,
  Title,
  WritingCard,
  WritingContent,
  WritingHeading,
  WritingSection,
} from "@/src/components/diary/HomeDiary.styles";
import { getRandomDiaryPrompt } from "@/src/data/diaryPrompts";
import { diaryEntriesState } from "@/src/store/diaryStore";
import { useRecoilState } from "@/src/store/recoilCompat";
import type { DiaryDraft } from "@/src/types/diary";
import { createDiaryEntry } from "@/src/utils/diaryStorage";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function HomeDiary() {
  const [draft, setDraft] = useState<DiaryDraft>({
    content: "",
    date: getToday(),
    mood: "calm",
    title: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [prompt, setPrompt] = useState(() => getRandomDiaryPrompt());
  const [, setEntries] = useRecoilState(diaryEntriesState);

  const updateDraft = (nextDraft: Partial<DiaryDraft>) => {
    setDraft((current) => ({ ...current, ...nextDraft }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.title.trim() || !draft.content.trim()) {
      setIsSuccess(false);
      setMessage("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const nextEntry = createDiaryEntry({
      ...draft,
      content: draft.content.trim(),
      title: draft.title.trim(),
    });

    setEntries((currentEntries) => [nextEntry, ...currentEntries]);

    setDraft({
      content: "",
      date: getToday(),
      mood: "calm",
      title: "",
    });
    setIsSuccess(true);
    setMessage("일기가 저장되었습니다. 월간 기록 페이지에서 확인할 수 있어요.");
  };

  return (
    <Page>
      <Hero>
        <HeroContent>
          <Title>오늘의 일기를 남겨보세요</Title>
          <Description
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -28 }}
            transition={{ delay: 0.15, duration: 1.05, ease: "easeOut" }}
          >
            짧아도 괜찮습니다.
            <br /> 오늘의 감정과 생각을 기록하면
            <br /> 월간 달력과 작성횟수 그래프에 바로 반영됩니다.
          </Description>
        </HeroContent>
      </Hero>

      <WritingSection>
        <WritingCard>
          <WritingContent>
            <WritingHeading>일기 작성</WritingHeading>
            <PromptMemo>
              <PromptBody>
                <PromptLabel>오늘의 글감</PromptLabel>
                <PromptText aria-live="polite">{prompt}</PromptText>
              </PromptBody>
              <PromptRefreshButton
                aria-label="글감 새로고침"
                onClick={() =>
                  setPrompt((currentPrompt) =>
                    getRandomDiaryPrompt(currentPrompt),
                  )
                }
                title="글감 새로고침"
                type="button"
              >
                <FaSyncAlt aria-hidden="true" />
              </PromptRefreshButton>
            </PromptMemo>
            <Form onSubmit={handleSubmit}>
              <FieldGrid>
                <Input
                  label="제목"
                  onChange={(event) => updateDraft({ title: event.target.value })}
                  placeholder="오늘을 한 문장으로 적어보세요"
                  value={draft.title}
                />
                <Input
                  label="날짜"
                  onChange={(event) => updateDraft({ date: event.target.value })}
                  type="date"
                  value={draft.date}
                />
              </FieldGrid>

              <EmotionRadioGroup
                onChange={(mood) => updateDraft({ mood })}
                value={draft.mood}
              />

              <Textarea
                id="diary-content"
                label="내용"
                onChange={(event) => updateDraft({ content: event.target.value })}
                placeholder="오늘 있었던 일, 감정, 기억하고 싶은 장면을 적어보세요."
                value={draft.content}
              />

              <Feedback
                $success={isSuccess}
                $visible={Boolean(message)}
                aria-hidden={!message}
                aria-live="polite"
              >
                {message}
              </Feedback>

              <Actions>
                <Button
                  $variant="ghost"
                  onClick={() =>
                    setDraft({
                      content: "",
                      date: getToday(),
                      mood: "calm",
                      title: "",
                    })
                  }
                  type="button"
                >
                  초기화
                </Button>
                <Button type="submit">일기 저장</Button>
              </Actions>
            </Form>
          </WritingContent>
        </WritingCard>
      </WritingSection>

      <DiaryWriteFloatButton
        onWrite={() => document.getElementById("diary-content")?.focus()}
        tooltip="일기 내용 바로 쓰기"
      />
    </Page>
  );
}

export default HomeDiary;
