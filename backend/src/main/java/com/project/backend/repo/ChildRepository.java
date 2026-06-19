package com.project.backend.repo;

import com.project.backend.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Long> {
}