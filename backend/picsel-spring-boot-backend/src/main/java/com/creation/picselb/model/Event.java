package com.creation.picselb.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity @Table(name = "events")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Event {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private LocalDate date;
    private LocalTime time;
    private String location;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String eventType;
    private String registerUrl;
    private String token;
    private String coverImage;
    @ElementCollection @CollectionTable(name = "event_gallery", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "image_url")
    private List<String> gallery;
    private Boolean registrationOpen;
    private String googleFormUrl;
}