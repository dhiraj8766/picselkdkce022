package com.creation.picselb.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class RegistrationDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String college;
    private String department;
    private String year;
    private Long eventId;
    private String eventTitle;
}