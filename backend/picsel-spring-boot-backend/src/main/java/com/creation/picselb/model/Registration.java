package com.creation.picselb.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "registrations")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Registration {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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