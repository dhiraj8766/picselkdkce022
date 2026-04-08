package com.creation.picselb.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "faculty_members")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Faculty {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role;
    private String mobile;
    private String email;
    private String imageUrl;
    @Column(columnDefinition = "TEXT")
    private String message;
}