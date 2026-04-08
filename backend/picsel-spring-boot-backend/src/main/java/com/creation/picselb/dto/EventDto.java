package com.creation.picselb.dto;

import lombok.*; import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class EventDto {
    private Long id;
    private String title;
    private String date;
    private String time;
    private String location;
    private String description;
    private String eventType;
    private String registerUrl;
    private String token;
    private String coverImage;
    private List<String> gallery;
    private Boolean registrationOpen;
    private String googleFormUrl;

}