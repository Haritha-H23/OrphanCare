package com.project.backend.controller;

import com.project.backend.DTO.PaymentOrderRequest;
import com.project.backend.DTO.PaymentOrderResponse;
import com.project.backend.service.PaymentService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public PaymentOrderResponse createOrder(
            @RequestBody PaymentOrderRequest request
    ) throws RazorpayException {

        return paymentService.createOrder(request.getAmount());
    }
}