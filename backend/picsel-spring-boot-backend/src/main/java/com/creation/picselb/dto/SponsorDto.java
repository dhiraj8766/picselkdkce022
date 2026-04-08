package com.creation.picselb.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SponsorDto {
    private Long id;
    private String name;
    private String logoUrl;
    private String website;
    private String tier;
}