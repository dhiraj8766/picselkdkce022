package com.creation.picselb.service;

import com.creation.picselb.dto.*;
import com.creation.picselb.model.Event;
import com.creation.picselb.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class EventService {
    private final EventRepository repo;
    private final CloudinaryService cloud;

    public List<EventDto> getAll() { return repo.findAll().stream().map(this::toDto).collect(Collectors.toList()); }

    public List<EventDto> getNearest() {
        return repo.findAll().stream()
            .filter(e -> e.getDate() != null && !e.getDate().isBefore(LocalDate.now()))
            .sorted(Comparator.comparing(Event::getDate))
            .limit(5).map(this::toDto).collect(Collectors.toList());
    }

    public EventDto create(AddEventRequestNoUrlDto dto, MultipartFile cover, List<MultipartFile> gallery) throws IOException {
        Event e = new Event();
        e.setTitle(dto.getTitle());
        e.setDate(parseDate(dto.getDate()));
        e.setTime(parseTime(dto.getTime()));
        e.setLocation(dto.getLocation());
        e.setDescription(dto.getDescription());
        e.setEventType(dto.getEventType());
        e.setRegisterUrl(dto.getRegisterUrl());
        e.setToken(dto.getToken());
        e.setRegistrationOpen(dto.getRegistrationOpen());
        e.setGoogleFormUrl(dto.getGoogleFormUrl());
        if (cover != null) e.setCoverImage(cloud.upload(cover, "picsel/events"));
        if (gallery != null) {
            List<String> urls = new ArrayList<>();
            for (MultipartFile f : gallery) urls.add(cloud.upload(f, "picsel/events/gallery"));
            e.setGallery(urls);
        }
        return toDto(repo.save(e));
    }

    public EventDto update(Long id, AddEventRequestNoUrlDto dto) {
        Event e = repo.findById(id).orElseThrow();
        e.setTitle(dto.getTitle());
        e.setDate(parseDate(dto.getDate()));
        e.setTime(parseTime(dto.getTime()));
        e.setLocation(dto.getLocation());
        e.setDescription(dto.getDescription());
        e.setEventType(dto.getEventType());
        e.setRegisterUrl(dto.getRegisterUrl());
        e.setToken(dto.getToken());
        e.setRegistrationOpen(dto.getRegistrationOpen());
        e.setGoogleFormUrl(dto.getGoogleFormUrl());
        return toDto(repo.save(e));
    }

    public EventDto updateImages(Long id, MultipartFile cover, List<MultipartFile> gallery, List<String> kept) throws IOException {
        Event e = repo.findById(id).orElseThrow();
        if (cover != null) {
            if (e.getCoverImage() != null) cloud.delete(e.getCoverImage());
            e.setCoverImage(cloud.upload(cover, "picsel/events"));
        }
        List<String> oldGallery = e.getGallery() != null ? new ArrayList<>(e.getGallery()) : new ArrayList<>();
        List<String> newGallery = kept != null ? new ArrayList<>(kept) : new ArrayList<>();
        oldGallery.stream().filter(url -> !newGallery.contains(url)).forEach(cloud::delete);
        if (gallery != null) {
            for (MultipartFile f : gallery) newGallery.add(cloud.upload(f, "picsel/events/gallery"));
        }
        e.setGallery(newGallery);
        return toDto(repo.save(e));
    }

    public void delete(Long id) {
        Event e = repo.findById(id).orElseThrow();
        if (e.getCoverImage() != null) cloud.delete(e.getCoverImage());
        if (e.getGallery() != null) e.getGallery().forEach(cloud::delete);
        repo.deleteById(id);
    }

    private LocalDate parseDate(String s) {
        if (s == null || s.isBlank()) return null;
        try { return LocalDate.parse(s); } catch (Exception ex) {
            try { return LocalDate.parse(s, DateTimeFormatter.ofPattern("dd-MM-yyyy")); } catch (Exception ex2) { return null; }
        }
    }
    private LocalTime parseTime(String s) {
        if (s == null || s.isBlank()) return null;

        try {
            if (s.length() == 5) {
                s = s + ":00";   // ✅ IMPORTANT FIX
            }
            return LocalTime.parse(s);
        } catch (Exception ex) {
            return null;
        }
    }

    private EventDto toDto(Event e) {
        return EventDto.builder().id(e.getId()).title(e.getTitle())
            .date(e.getDate() != null ? e.getDate().toString() : "")
                .time(e.getTime() != null ? e.getTime().format(DateTimeFormatter.ofPattern("HH:mm")) : "")
            .location(e.getLocation()).description(e.getDescription())
            .eventType(e.getEventType()).registerUrl(e.getRegisterUrl())
            .token(e.getToken()).coverImage(e.getCoverImage()).gallery(e.getGallery())
                .registrationOpen(e.getRegistrationOpen())
                .googleFormUrl(e.getGoogleFormUrl()).build();
    }
}