package com.project.backend.service;

import com.project.backend.entity.User;
import com.project.backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, User updatedUser) {
        User existingUser = getUserByEmail(email);

        existingUser.setFullName(updatedUser.getFullName());
        existingUser.setPhone(updatedUser.getPhone());

        return userRepository.save(existingUser);
    }
}