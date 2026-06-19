package com.project.backend.controller;


import com.project.backend.DTO.RequirementRequest;
import com.project.backend.entity.Requirement;
import com.project.backend.service.RequirementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requirements")
@RequiredArgsConstructor
public class RequirementController {

    private final RequirementService requirementService;

    @GetMapping
    public List<Requirement> getAllRequirements() {
        return requirementService.getAllRequirements();
    }

    @GetMapping("/{id}")
    public Requirement getRequirementById(@PathVariable Long id) {
        return requirementService.getRequirementById(id);
    }

    @PostMapping
    public Requirement addRequirement(@RequestBody RequirementRequest request) {
        return requirementService.addRequirement(request);
    }

    @PutMapping("/{id}")
    public Requirement updateRequirement(
            @PathVariable Long id,
            @RequestBody Requirement requirement
    ) {
        return requirementService.updateRequirement(id, requirement);
    }

    @DeleteMapping("/{id}")
    public String deleteRequirement(@PathVariable Long id) {
        requirementService.deleteRequirement(id);
        return "Requirement deleted successfully";
    }
}