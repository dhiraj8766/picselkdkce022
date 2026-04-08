package com.creation.picselb.service;

import com.creation.picselb.dto.FacultyDto;
import com.creation.picselb.model.Faculty;
import com.creation.picselb.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class FacultyService {
    private final FacultyRepository repo;
    private final CloudinaryService cloud;

    public List<FacultyDto> getAll() { return repo.findAll().stream().map(this::toDto).collect(Collectors.toList()); }

    public FacultyDto create(FacultyDto dto, MultipartFile image) throws IOException {
        Faculty f = new Faculty();
        f.setName(dto.getName()); f.setRole(dto.getRole()); f.setMobile(dto.getMobile());
        f.setEmail(dto.getEmail()); f.setMessage(dto.getMessage());
        if (image != null) f.setImageUrl(cloud.upload(image, "picsel/faculty"));
        return toDto(repo.save(f));
    }

    public FacultyDto update(Long id, FacultyDto dto) {
        Faculty f = repo.findById(id).orElseThrow();
        f.setName(dto.getName()); f.setRole(dto.getRole()); f.setMobile(dto.getMobile());
        f.setEmail(dto.getEmail()); f.setMessage(dto.getMessage());
        return toDto(repo.save(f));
    }

    public FacultyDto updateImage(Long id, MultipartFile image) throws IOException {
        Faculty f = repo.findById(id).orElseThrow();
        if (f.getImageUrl() != null) cloud.delete(f.getImageUrl());
        f.setImageUrl(cloud.upload(image, "picsel/faculty"));
        return toDto(repo.save(f));
    }

    public void delete(Long id) {
        Faculty f = repo.findById(id).orElseThrow();
        if (f.getImageUrl() != null) cloud.delete(f.getImageUrl());
        repo.deleteById(id);
    }

    private FacultyDto toDto(Faculty f) {
        return FacultyDto.builder().id(f.getId()).name(f.getName()).role(f.getRole())
            .mobile(f.getMobile()).email(f.getEmail()).imageUrl(f.getImageUrl()).message(f.getMessage()).build();
    }
}