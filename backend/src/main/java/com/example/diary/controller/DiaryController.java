package com.example.diary.controller;

import java.time.YearMonth;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.diary.dto.DiaryRequest;
import com.example.diary.dto.DiaryResponse;
import com.example.diary.exception.ApiException;
import com.example.diary.security.JwtUserPrincipal;
import com.example.diary.service.DiaryService;

@EnableScheduling
@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @GetMapping
    public List<DiaryResponse> getDiaryEntries(
            @AuthenticationPrincipal JwtUserPrincipal principal,
            @RequestParam(required = false) String month
    ) {
        if (month == null || month.isBlank()) {
            return diaryService.getDiaryEntries(principal.id())
                    .stream()
                    .map(diaryEntry -> DiaryResponse.from(diaryEntry, principal.name()))
                    .toList();
        }

        YearMonth yearMonth = parseYearMonth(month);

        return diaryService
                .getMonthlyDiaryEntries(
                        principal.id(),
                        yearMonth.atDay(1),
                        yearMonth.atEndOfMonth()
                )
                .stream()
                .map(diaryEntry -> DiaryResponse.from(diaryEntry, principal.name()))
                .toList();
    }

    @GetMapping("/{diaryEntryId}")
    public DiaryResponse getDiaryEntry(
            @AuthenticationPrincipal JwtUserPrincipal principal,
            @PathVariable UUID diaryEntryId
    ) {
        return DiaryResponse.from(
                diaryService.getDiaryEntry(principal.id(), diaryEntryId),
                principal.name()
        );
    }

    @PostMapping
    public ResponseEntity<DiaryResponse> createDiaryEntry(
            @AuthenticationPrincipal JwtUserPrincipal principal,
            @RequestBody DiaryRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(DiaryResponse.from(
                        diaryService.createDiaryEntry(principal.id(), request),
                        principal.name()
                ));
    }

    @PutMapping("/{diaryEntryId}")
    public DiaryResponse updateDiaryEntry(
            @AuthenticationPrincipal JwtUserPrincipal principal,
            @PathVariable UUID diaryEntryId,
            @RequestBody DiaryRequest request
    ) {
        return DiaryResponse.from(
                diaryService.updateDiaryEntry(principal.id(), diaryEntryId, request),
                principal.name()
        );
    }

    @DeleteMapping("/{diaryEntryId}")
    public ResponseEntity<Void> deleteDiaryEntry(
            @AuthenticationPrincipal JwtUserPrincipal principal,
            @PathVariable UUID diaryEntryId
    ) {
        diaryService.deleteDiaryEntry(principal.id(), diaryEntryId);
        return ResponseEntity.noContent().build();
    }

    private YearMonth parseYearMonth(String month) {
        try {
            return YearMonth.parse(month);
        } catch (DateTimeParseException exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "월 형식이 올바르지 않습니다.");
        }
    }
}
