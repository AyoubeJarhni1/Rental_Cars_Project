package com.rentalcars.backendSpring.payload.request;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public Object getEmail() {
        return email;
    }

    public Object getPassword() {
        return password;
    }

    // Getters et setters
}