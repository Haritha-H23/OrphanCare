package com.project.backend.DTO;

import lombok.Data;

@Data
public class DonationRequest {

    private Long requirementId;
    private Double amount;
    private String paymentReference;
}