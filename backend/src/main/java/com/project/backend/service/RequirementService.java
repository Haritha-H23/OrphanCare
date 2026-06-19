package com.project.backend.service;


import com.project.backend.DTO.RequirementRequest;
import com.project.backend.entity.Child;
import com.project.backend.entity.Requirement;
import com.project.backend.repo.ChildRepository;
import com.project.backend.repo.RequirementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequirementService {

    private final RequirementRepository requirementRepository;

    private final ChildRepository childRepository;
    public List<Requirement> getAllRequirements() {
        return requirementRepository.findAll();
    }

    public Requirement getRequirementById(Long id) {
        return requirementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Requirement not found"));
    }

    public Requirement addRequirement(RequirementRequest request) {

    Child child = childRepository.findById(request.getChildId())
        .orElseThrow(() -> new RuntimeException("Child not found"));

    Requirement requirement = new Requirement();

    requirement.setTitle(request.getTitle());
    requirement.setDescription(request.getDescription());
    requirement.setAmountNeeded(request.getAmountNeeded());
    requirement.setAmountCollected(0.0);
    requirement.setStatus(request.getStatus());
    requirement.setChild(child);

    return requirementRepository.save(requirement);
}

    public Requirement updateRequirement(Long id, Requirement updatedRequirement) {
        Requirement existingRequirement = getRequirementById(id);

        existingRequirement.setTitle(updatedRequirement.getTitle());
        existingRequirement.setDescription(updatedRequirement.getDescription());
        existingRequirement.setAmountNeeded(updatedRequirement.getAmountNeeded());
        existingRequirement.setStatus(updatedRequirement.getStatus());

        return requirementRepository.save(existingRequirement);
    }

    public void deleteRequirement(Long id) {
        Requirement requirement = getRequirementById(id);
        requirementRepository.delete(requirement);
    }
}