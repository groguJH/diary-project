package com.example.diary.service;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.diary.dto.DiaryRequest;
import com.example.diary.entity.DiaryEntity;
import com.example.diary.entity.User;
import com.example.diary.exception.ApiException;
import com.example.diary.repository.DiaryEntryRepository;
import com.example.diary.repository.UserRepository;


@Service
@Transactional(readOnly = true)
public class DiaryService {

        private static final List<String> ALLOWED_MOODS = List.of(
                "happy",
                "calm",
                "sad",
                "tired",
                "angry"
        );

        private final DiaryEntryRepository diaryEntryRepository;
        private final UserRepository userRepository;

        public DiaryService(
                DiaryEntryRepository diaryEntryRepository,
                UserRepository userRepository
        ) {
            this.diaryEntryRepository = diaryEntryRepository;
            this.userRepository = userRepository;
        }
        
        @Transactional
        public DiaryEntity createDiaryEntry(UUID userId, DiaryRequest request) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."));
            DiaryEntity diaryEntry = new DiaryEntity();

            diaryEntry.setUser(user);
            applyRequest(diaryEntry, request);
            return diaryEntryRepository.save(diaryEntry);
        }

        public List<DiaryEntity> getDiaryEntries(UUID userId) {
            return diaryEntryRepository.findByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(userId);
        }

        public List<DiaryEntity> getMonthlyDiaryEntries(
                UUID userId,
                LocalDate startDate,
                LocalDate endDate
        ) {
            return diaryEntryRepository
                    .findByUserIdAndDiaryDateBetweenAndDeletedAtIsNullOrderByDiaryDateAscCreatedAtDesc(
                            userId,
                            startDate,
                            endDate
                    );
        }

        public DiaryEntity getDiaryEntry(UUID userId, UUID diaryEntryId) {
            return diaryEntryRepository.findByIdAndUserIdAndDeletedAtIsNull(diaryEntryId, userId)
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "일기를 찾을 수 없습니다."));
        }

        @Transactional
        public DiaryEntity updateDiaryEntry(
                UUID userId,
                UUID diaryEntryId,
                DiaryRequest request
        ) {
            DiaryEntity diaryEntry = getDiaryEntry(userId, diaryEntryId);

            applyRequest(diaryEntry, request);
            return diaryEntryRepository.save(diaryEntry);
        }

        @Transactional
        public void deleteDiaryEntry(UUID userId, UUID diaryEntryId) {
            DiaryEntity diaryEntry = getDiaryEntry(userId, diaryEntryId);

            diaryEntry.setDeletedAt(ZonedDateTime.now());
        }

        private void applyRequest(DiaryEntity diaryEntry, DiaryRequest request) {
            diaryEntry.setTitle(normalizeTitle(request.title()));
            diaryEntry.setDiaryDate(parseDate(request.date()));
            diaryEntry.setMood(normalizeMood(request.mood()));
            diaryEntry.setContent(normalizeContent(request.content()));
        }

        private String normalizeTitle(String title) {
            String normalizedTitle = requireText(title, "제목을 입력해주세요.");

            if (normalizedTitle.length() > 100) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "제목은 100자 이하로 입력해주세요.");
            }

            return normalizedTitle;
        }

        private String normalizeContent(String content) {
            return requireText(content, "내용을 입력해주세요.");
        }

        private String normalizeMood(String mood) {
            String normalizedMood = requireText(mood, "감정을 선택해주세요.");

            if (!ALLOWED_MOODS.contains(normalizedMood)) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "지원하지 않는 감정입니다.");
            }

            return normalizedMood;
        }

        private LocalDate parseDate(String date) {
            try {
                return LocalDate.parse(requireText(date, "날짜를 입력해주세요."));
            } catch (DateTimeParseException exception) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "날짜 형식이 올바르지 않습니다.");
            }
        }

        private String requireText(String value, String message) {
            if (value == null || value.trim().isEmpty()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, message);
            }

            return value.trim();
        }
}
