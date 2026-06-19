package com.project.backend.service;

import com.project.backend.DTO.PaymentOrderResponse;
import com.razorpay.*;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    public PaymentOrderResponse createOrder(double amount)
            throws RazorpayException {

        RazorpayClient client =
                new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();

        options.put("amount", (int)(amount * 100));
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(options);

        return new PaymentOrderResponse(
                order.get("id"),
                order.get("amount"),
                order.get("currency"),
                keyId
        );
    }
}