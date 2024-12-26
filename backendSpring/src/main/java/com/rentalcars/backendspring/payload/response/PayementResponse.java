package com.rentalcars.backendspring.payload.response;

public class PayementResponse {

    private String clientSecret;  // Client secret returned by Stripe

    public PayementResponse(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
