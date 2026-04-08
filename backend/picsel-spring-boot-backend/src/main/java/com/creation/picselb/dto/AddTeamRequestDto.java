package com.creation.picselb.dto;

import lombok.*; import java.util.Map;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AddTeamRequestDto {
    private String name;
    private String role;
    private String description;
    private String mobile;
    private String email;
    private int tokenNo;
    private Map<String, String> socials;
}