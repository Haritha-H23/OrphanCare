package com.project.backend.controller;

import com.project.backend.DTO.DonationRequest;
import com.project.backend.entity.Donation;
import com.project.backend.service.DonationService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public Donation makeDonation(
            @RequestBody DonationRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        return donationService.makeDonation(
                email,
                request.getRequirementId(),
                request.getAmount(),
                request.getPaymentReference()
        );
    }

    @GetMapping("/my")
public List<Donation> getMyDonations(Authentication authentication) {
    String email = authentication.getName();
    return donationService.getDonationsByEmail(email);
}

    @GetMapping("/user/{userId}")
    public List<Donation> getDonationsByUser(@PathVariable Long userId) {
        return donationService.getDonationsByUser(userId);
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }
}