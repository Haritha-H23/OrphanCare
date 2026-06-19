package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "donations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
@JoinColumn(name = "donor_id")
@JsonIgnoreProperties({"donations"})
private User donor;

@ManyToOne
@JoinColumn(name = "requirement_id")
@JsonIgnoreProperties({"donations"})
private Requirement requirement;

    @Column(nullable = false)
    private Double amount;

    @Column(unique = true)
    private String paymentReference;

    @Column(nullable = false)
    private LocalDateTime donationDate;

    @PrePersist
    public void prePersist() {
        this.donationDate = LocalDateTime.now();
    }
}