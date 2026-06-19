package com.project.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class uploadService {

    private final String uploadDir =
            System.getProperty("user.dir") + File.separator + "uploads";

    public String uploadFile(MultipartFile file) throws IOException {

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        File destination =
                new File(directory, fileName);

        file.transferTo(destination);

        return "/uploads/" + fileName;
    }
}