package com.creation.picselb.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "team_members")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Team {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String mobile;
    private String email;
    private int tokenNo;
    private String imageUrl;
    private String linkedinUrl;
    private String instagramUrl;
    private String twitterUrl;
}