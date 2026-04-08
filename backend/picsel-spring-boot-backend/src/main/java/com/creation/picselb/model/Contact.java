package com.creation.picselb.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "contacts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Contact {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String subject;
    @Column(columnDefinition = "TEXT")
    private String message;
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() { this.createdAt = LocalDateTime.now(); }
}