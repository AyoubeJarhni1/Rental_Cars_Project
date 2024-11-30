package com.rentalcars.backendSpring.payload.request;

import jakarta.validation.constraints.NotBlank;
import java.util.Set;

public class SignupRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private Set<String> role; // Rôles comme "admin", "mod", "user" (facultatif)

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public CharSequence getPassword() {
    return password;
    }
    public Set<String> getRole() {
        return role;
    }


    // Getters et setters
}