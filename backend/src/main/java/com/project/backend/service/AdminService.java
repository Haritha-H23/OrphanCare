package com.project.backend.service;

import com.project.backend.DTO.AdminStatsResponse;
import com.project.backend.entity.Role;
import com.project.backend.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final RequirementRepository requirementRepository;
    private final DonationRepository donationRepository;

    public AdminStatsResponse getStats() {
        long totalUsers = userRepository.count();

        long totalDonors =
                userRepository.countByRole(Role.DONOR);

        long totalChildren = childRepository.count();

        long totalRequirements = requirementRepository.count();

        double totalDonationsAmount =
                donationRepository.findAll()
                        .stream()
                        .mapToDouble(d -> d.getAmount())
                        .sum();

        return new AdminStatsResponse(
                totalUsers,
                totalDonors,
                totalChildren,
                totalRequirements,
                totalDonationsAmount
        );
    }
}