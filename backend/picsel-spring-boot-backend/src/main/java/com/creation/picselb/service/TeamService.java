package com.creation.picselb.service;

import com.creation.picselb.dto.*;
import com.creation.picselb.model.Team;
import com.creation.picselb.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class TeamService {
    private final TeamRepository repo;
    private final CloudinaryService cloud;

    public List<TeamDto> getAll() { return repo.findAll().stream().map(this::toDto).collect(Collectors.toList()); }

    public TeamDto create(AddTeamRequestDto dto, MultipartFile image) throws IOException {
        Team t = new Team();
        t.setName(dto.getName()); t.setRole(dto.getRole()); t.setDescription(dto.getDescription());
        t.setMobile(dto.getMobile()); t.setEmail(dto.getEmail()); t.setTokenNo(dto.getTokenNo());
        if (dto.getSocials() != null) {
            t.setLinkedinUrl(dto.getSocials().getOrDefault("linkedin", ""));
            t.setInstagramUrl(dto.getSocials().getOrDefault("instagram", ""));
            t.setTwitterUrl(dto.getSocials().getOrDefault("twitter", ""));
        }
        if (image != null) t.setImageUrl(cloud.upload(image, "picsel/team"));
        return toDto(repo.save(t));
    }

    public TeamDto update(Long id, AddTeamRequestDto dto) {
        Team t = repo.findById(id).orElseThrow();
        t.setName(dto.getName()); t.setRole(dto.getRole()); t.setDescription(dto.getDescription());
        t.setMobile(dto.getMobile()); t.setEmail(dto.getEmail()); t.setTokenNo(dto.getTokenNo());
        if (dto.getSocials() != null) {
            t.setLinkedinUrl(dto.getSocials().getOrDefault("linkedin", ""));
            t.setInstagramUrl(dto.getSocials().getOrDefault("instagram", ""));
            t.setTwitterUrl(dto.getSocials().getOrDefault("twitter", ""));
        }
        return toDto(repo.save(t));
    }

    public TeamDto updateImage(Long id, MultipartFile image) throws IOException {
        Team t = repo.findById(id).orElseThrow();
        if (t.getImageUrl() != null) cloud.delete(t.getImageUrl());
        t.setImageUrl(cloud.upload(image, "picsel/team"));
        return toDto(repo.save(t));
    }

    public void delete(Long id) {
        Team t = repo.findById(id).orElseThrow();
        if (t.getImageUrl() != null) cloud.delete(t.getImageUrl());
        repo.deleteById(id);
    }

    private TeamDto toDto(Team t) {
        Map<String, String> socials = new HashMap<>();
        socials.put("linkedin", t.getLinkedinUrl() != null ? t.getLinkedinUrl() : "");
        socials.put("instagram", t.getInstagramUrl() != null ? t.getInstagramUrl() : "");
        socials.put("twitter", t.getTwitterUrl() != null ? t.getTwitterUrl() : "");
        return TeamDto.builder().id(t.getId()).name(t.getName()).role(t.getRole())
            .description(t.getDescription()).mobile(t.getMobile()).email(t.getEmail())
            .tokenNo(t.getTokenNo()).imageUrl(t.getImageUrl()).socials(socials).build();
    }
}