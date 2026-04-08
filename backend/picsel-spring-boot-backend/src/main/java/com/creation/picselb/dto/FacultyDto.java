package com.creation.picselb.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FacultyDto {
    private Long id;
    private String name;
    private String role;
    private String mobile;
    private String email;
    private String imageUrl;
    private String message;
}