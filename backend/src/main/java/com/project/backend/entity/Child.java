package com.project.backend.entity;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "children")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer age;

    private String gender;

    private String education;

    private String healthStatus;

    private String imageUrl;

    @OneToMany(mappedBy = "child")
@JsonIgnore
private List<Requirement> requirements;

    @Column(length = 1000)
    private String description;
}