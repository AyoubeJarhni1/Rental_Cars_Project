package com.rentalcars.backendspring.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;



@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;


    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }


    public PaymentIntent createPaymentIntent(long amount) throws StripeException {

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency("usd")
                .build();

        return PaymentIntent.create(params);
    }
}
