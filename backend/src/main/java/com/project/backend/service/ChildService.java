package com.project.backend.service;

import com.project.backend.entity.Child;
import com.project.backend.repo.ChildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChildService {

    private final ChildRepository childRepository;

    public List<Child> getAllChildren() {
        return childRepository.findAll();
    }

    public Child getChildById(Long id) {
        return childRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Child not found"));
    }

    public Child addChild(Child child) {
        return childRepository.save(child);
    }

    public Child updateChild(Long id, Child updatedChild) {
        Child existingChild = getChildById(id);

        existingChild.setName(updatedChild.getName());
        existingChild.setAge(updatedChild.getAge());
        existingChild.setGender(updatedChild.getGender());
        existingChild.setEducation(updatedChild.getEducation());
        existingChild.setHealthStatus(updatedChild.getHealthStatus());
        existingChild.setImageUrl(updatedChild.getImageUrl());
        existingChild.setDescription(updatedChild.getDescription());

        return childRepository.save(existingChild);
    }

    public void deleteChild(Long id) {
        Child child = getChildById(id);
        childRepository.delete(child);
    }
}