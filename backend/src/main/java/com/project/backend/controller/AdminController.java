package com.project.backend.controller;

import com.project.backend.DTO.AdminStatsResponse;
import com.project.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public AdminStatsResponse getDashboardStats() {
        return adminService.getStats();
    }
}