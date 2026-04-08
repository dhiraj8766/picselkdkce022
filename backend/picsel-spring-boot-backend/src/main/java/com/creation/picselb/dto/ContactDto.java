package com.creation.picselb.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ContactDto {
    private Long id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private String createdAt;
}