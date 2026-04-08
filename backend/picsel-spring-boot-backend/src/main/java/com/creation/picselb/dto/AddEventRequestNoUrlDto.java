package com.creation.picselb.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AddEventRequestNoUrlDto {
    private String title;
    private String date;
    private String time;
    private String location;
    private String description;
    private String eventType;
    private String registerUrl;
    private String token;
    private Boolean registrationOpen;
    private String googleFormUrl;
}