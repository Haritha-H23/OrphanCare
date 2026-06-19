package com.project.backend.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ChildRequest {

    private String name;
    private Integer age;
    private String gender;
    private String education;
    private String healthStatus;
    private String description;
    private MultipartFile image;
}