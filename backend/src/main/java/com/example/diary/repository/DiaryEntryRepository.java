package com.example.diary.repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.diary.entity.DiaryEntity;

public interface DiaryEntryRepository extends JpaRepository<DiaryEntity, UUID>{

    Optional<DiaryEntity> findByIdAndUserIdAndDeletedAtIsNull(UUID id, UUID userId);

    List<DiaryEntity> findByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(UUID userId);

    List<DiaryEntity> findByUserIdAndDiaryDateBetweenAndDeletedAtIsNullOrderByDiaryDateAscCreatedAtDesc(
            UUID userId,
            LocalDate startDate,
            LocalDate endDate
    );
}
