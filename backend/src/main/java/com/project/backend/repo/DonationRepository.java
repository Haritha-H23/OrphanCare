package com.project.backend.repo;

import com.project.backend.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByDonorId(Long donorId);
    List<Donation> findByDonorEmail(String email);

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Donation d")
Double getTotalDonationAmount();
}