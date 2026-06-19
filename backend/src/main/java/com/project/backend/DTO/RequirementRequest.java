package com.project.backend.DTO;

import lombok.Data;

@Data
public class RequirementRequest {
    private String title;
    private String description;
    private double amountNeeded;
    private double amountCollected;
    private String status;
    private Long childId;
}