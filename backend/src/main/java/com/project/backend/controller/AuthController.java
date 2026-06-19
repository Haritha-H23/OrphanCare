package com.project.backend.controller;


import com.project.backend.DTO.LoginRequest;
import com.project.backend.DTO.LoginResponse;
import com.project.backend.entity.User;
import com.project.backend.service.AuthService;
import lombok.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}