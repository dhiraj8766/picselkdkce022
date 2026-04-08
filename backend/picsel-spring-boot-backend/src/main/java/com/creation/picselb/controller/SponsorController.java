package com.creation.picselb.controller;

import com.creation.picselb.model.Sponsor;
import com.creation.picselb.repository.SponsorRepository;
import com.creation.picselb.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController @RequestMapping("/api/sponsors") @RequiredArgsConstructor
public class SponsorController {
    private final SponsorRepository repo;
    private final CloudinaryService cloud;

    @GetMapping
    public List<Sponsor> getAll() { return repo.findAll(); }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Sponsor> create(
        @RequestPart("data") Sponsor dto,
        @RequestPart(value = "logo", required = false) MultipartFile logo) throws IOException {
        if (logo != null) dto.setLogoUrl(cloud.upload(logo, "picsel/sponsors"));
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(dto));
    }

    @PutMapping("/{id}")
    public Sponsor update(@PathVariable Long id, @RequestBody Sponsor dto) {
        Sponsor s = repo.findById(id).orElseThrow();
        s.setName(dto.getName()); s.setWebsite(dto.getWebsite()); s.setTier(dto.getTier());
        return repo.save(s);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Sponsor s = repo.findById(id).orElseThrow();
        if (s.getLogoUrl() != null) cloud.delete(s.getLogoUrl());
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}