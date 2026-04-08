package com.creation.picselb.controller;

import com.creation.picselb.dto.*;
import com.creation.picselb.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController @RequestMapping("/api/events") @RequiredArgsConstructor
public class EventController {
    private final EventService service;

    @GetMapping
    public List<EventDto> getAll() { return service.getAll(); }

    @GetMapping("/nearest")
    public List<EventDto> getNearest() { return service.getNearest(); }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventDto> create(
        @RequestPart("data") AddEventRequestNoUrlDto dto,
        @RequestPart(value = "coverImage", required = false) MultipartFile cover,
        @RequestPart(value = "galleryImages", required = false) List<MultipartFile> gallery) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto, cover, gallery));
    }

    @PutMapping("/{id}")
    public EventDto update(@PathVariable Long id, @RequestBody AddEventRequestNoUrlDto dto) {
        return service.update(id, dto);
    }

    @PutMapping(value = "/images/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EventDto updateImages(@PathVariable Long id,
        @RequestPart(value = "coverImage", required = false) MultipartFile cover,
        @RequestPart(value = "galleryImages", required = false) List<MultipartFile> gallery,
        @RequestParam(value = "keptImages", required = false) List<String> kept) throws IOException {
        return service.updateImages(id, cover, gallery, kept);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}