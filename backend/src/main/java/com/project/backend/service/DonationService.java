package com.project.backend.service;

import com.project.backend.entity.Donation;
import com.project.backend.entity.Requirement;
import com.project.backend.entity.User;
import com.project.backend.repo.DonationRepository;
import com.project.backend.repo.RequirementRepository;
import com.project.backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final UserRepository userRepository;
    private final RequirementRepository requirementRepository;

    public Donation makeDonation(
        String email,
        Long requirementId,
        Double amount,
        String paymentReference
) {

        User donor = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Requirement requirement = requirementRepository.findById(requirementId)
                .orElseThrow(() -> new RuntimeException("Requirement not found"));

        Donation donation = Donation.builder()
                .donor(donor)
                .requirement(requirement)
                .amount(amount)
                .paymentReference(paymentReference)
                .build();

        requirement.setAmountCollected(requirement.getAmountCollected() + amount);

        if (requirement.getAmountCollected() >= requirement.getAmountNeeded()) {
            requirement.setStatus("COMPLETED");
        }

        requirementRepository.save(requirement);

        return donationRepository.save(donation);
    }

    public List<Donation> getDonationsByUser(Long userId) {
        return donationRepository.findByDonorId(userId);
    }

    public List<Donation> getDonationsByEmail(String email) {
    return donationRepository.findByDonorEmail(email);
}
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }
}