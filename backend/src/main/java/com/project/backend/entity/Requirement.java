package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "requirements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Double amountNeeded;

    @Builder.Default
    @Column(nullable = false)
    private Double amountCollected = 0.0;

    @Builder.Default
    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "requirement", cascade = CascadeType.ALL)
@JsonIgnore
private List<Donation> donations;


    @ManyToOne
@JoinColumn(name = "child_id")
private Child child;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();

        if (this.status == null) {
            this.status = "ACTIVE";
        }
    }
}
