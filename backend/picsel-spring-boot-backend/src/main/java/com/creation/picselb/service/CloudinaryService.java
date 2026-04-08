package com.creation.picselb.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service @RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public String upload(MultipartFile file, String folder) throws IOException {
        Map result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", folder));
        return (String) result.get("secure_url");
    }

    public void delete(String url) {
        try {
            String publicId = extractPublicId(url);
            if (publicId != null) cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) { System.err.println("Cloudinary delete failed: " + e.getMessage()); }
    }

    private String extractPublicId(String url) {
        if (url == null || !url.contains("cloudinary")) return null;
        String[] parts = url.split("/upload/");
        if (parts.length < 2) return null;
        String path = parts[1];
        if (path.startsWith("v")) { path = path.substring(path.indexOf("/") + 1); }
        return path.substring(0, path.lastIndexOf("."));
    }
}