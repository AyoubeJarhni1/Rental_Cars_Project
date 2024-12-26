package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.payload.request.PayementRequest;
import com.rentalcars.backendspring.payload.response.PayementResponse;
import com.rentalcars.backendspring.services.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    // Endpoint to create PaymentIntent
    @PostMapping("/create-payment-intent")
    public PayementResponse createPaymentIntent(@RequestBody PayementRequest paymentRequest) {
        try {

            PaymentIntent paymentIntent = stripeService.createPaymentIntent(paymentRequest.getAmount());


            return new PayementResponse(paymentIntent.getClientSecret());
        } catch (StripeException e) {
            throw new RuntimeException("Error creating payment intent: " + e.getMessage(), e);
        }
    }
}