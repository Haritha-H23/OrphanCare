package com.project.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsResponse {

    private Long totalUsers;
    private Long totalDonors;
    private Long totalChildren;
    private Long totalRequirements;
    private Double totalDonationAmount;
}