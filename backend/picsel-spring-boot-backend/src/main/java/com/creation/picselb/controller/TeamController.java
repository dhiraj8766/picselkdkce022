package com.creation.picselb.controller;

import com.creation.picselb.dto.*;
import com.creation.picselb.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController @RequestMapping("/api/team") @RequiredArgsConstructor
public class TeamController {
    private final TeamService service;

    @GetMapping
    public List<TeamDto> getAll() { return service.getAll(); }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TeamDto> create(
        @RequestPart("data") AddTeamRequestDto dto,
        @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto, image));
    }

    @PutMapping("/{id}")
    public TeamDto update(@PathVariable Long id, @RequestBody AddTeamRequestDto dto) { return service.update(id, dto); }

    @PutMapping(value = "/images/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public TeamDto updateImage(@PathVariable Long id, @RequestPart("imageUrl") MultipartFile image) throws IOException {
        return service.updateImage(id, image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}