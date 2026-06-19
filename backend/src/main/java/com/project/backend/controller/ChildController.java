package com.project.backend.controller;

import com.project.backend.DTO.ChildRequest;
import com.project.backend.entity.Child;
import com.project.backend.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.project.backend.service.uploadService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/children")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;
private final uploadService uploadService;

    @GetMapping
    public List<Child> getAllChildren() {
        return childService.getAllChildren();
    }

    @PostMapping
public Child addChild(
        @ModelAttribute ChildRequest request
) throws IOException {

    String imageUrl =
            uploadService.uploadFile(request.getImage());

    Child child = new Child();

    child.setName(request.getName());
    child.setAge(request.getAge());
    child.setGender(request.getGender());
    child.setEducation(request.getEducation());
    child.setHealthStatus(request.getHealthStatus());
    child.setDescription(request.getDescription());
    child.setImageUrl(imageUrl);

    return childService.addChild(child);
}

    @PostMapping("/update/{id}")
public Child updateChild(
        @PathVariable Long id,
        @ModelAttribute ChildRequest request
) throws IOException {

    Child existing = childService.getChildById(id);

    existing.setName(request.getName());
    existing.setAge(request.getAge());
    existing.setGender(request.getGender());
    existing.setEducation(request.getEducation());
    existing.setHealthStatus(request.getHealthStatus());
    existing.setDescription(request.getDescription());

    if (request.getImage() != null &&
        !request.getImage().isEmpty()) {

        String imageUrl =
                uploadService.uploadFile(request.getImage());

        existing.setImageUrl(imageUrl);
    }

    return childService.updateChild(id, existing);
}

    @DeleteMapping("/{id}")
    public void deleteChild(@PathVariable Long id) {
        childService.deleteChild(id);
    }
}