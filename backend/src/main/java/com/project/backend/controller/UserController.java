package com.project.backend.controller;

import com.project.backend.entity.User;
import com.project.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public User getProfile(Authentication authentication) {
        String email = authentication.getName();
        return userService.getUserByEmail(email);
    }

    @PutMapping("/profile")
    public User updateProfile(
            Authentication authentication,
            @RequestBody User updatedUser
    ) {
        String email = authentication.getName();
        return userService.updateProfile(email, updatedUser);
    }
}