package com.rentalcars.backendspring.payload.response;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String email;

    // Constructeur
    public JwtResponse(String accessToken, String email) {
        this.token = accessToken;
        this.email = email;  // Correction ici
    }

    // Getters et Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
