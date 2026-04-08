package com.creation.picselb.dto;

import lombok.*; import java.util.Map;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TeamDto {
    private Long id;
    private String name;
    private String role;
    private String description;
    private String mobile;
    private String email;
    private int tokenNo;
    private String imageUrl;
    private Map<String, String> socials;
}