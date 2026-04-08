package com.creation.picselb.controller;

import com.creation.picselb.dto.FacultyDto;
import com.creation.picselb.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController @RequestMapping("/api/faculty") @RequiredArgsConstructor
public class FacultyController {
    private final FacultyService service;

    @GetMapping
    public List<FacultyDto> getAll() { return service.getAll(); }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FacultyDto> create(
        @RequestPart("data") FacultyDto dto,
        @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto, image));
    }

    @PutMapping("/{id}")
    public FacultyDto update(@PathVariable Long id, @RequestBody FacultyDto dto) { return service.update(id, dto); }

    @PutMapping(value = "/images/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public FacultyDto updateImage(@PathVariable Long id, @RequestPart("imageUrl") MultipartFile image) throws IOException {
        return service.updateImage(id, image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}