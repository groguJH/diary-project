package com.example.diary.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(
    name = "diary_entries",
    indexes = {
        @Index(name = "idx_diary_entries_user_date", columnList = "user_id, diary_date"),
        @Index(name = "idx_diary_entries_user_created_at", columnList = "user_id, created_at DESC")
    }
)
@Getter 
@Setter
public class DiaryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "diary_date", nullable = false)
    private LocalDate diaryDate; // 일기 날짜 (년-월-일)

    @Column(nullable = false, length = 20)
    private String mood; // happy, calm, sad, tired, angry

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;
}
