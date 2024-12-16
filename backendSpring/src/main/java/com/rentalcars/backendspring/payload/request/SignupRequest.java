package com.rentalcars.backendspring.payload.request;

import com.rentalcars.backendspring.models.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.Date;


public class SignupRequest {

    @Getter
    @NotBlank
    private String email;

    @NotBlank
    private String password;
    @Getter
    @NotNull
    private Role role;


    @Getter
    @NotBlank
    private String name;

    @Getter
    @NotBlank
    private String address;

    @Getter
    @NotNull
    private Date dateNaiss;


    @Getter
    @NotBlank
    String nTele;

    public CharSequence getPassword() {
        return this.password;
    }

    public void setAddress(@NotBlank String address) {
        this.address = address;
    }

    public void setDateNaiss(@NotNull Date dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public void setnTele(@NotNull String nTele) {
        this.nTele = nTele;
    }

    public void setRole(@NotNull Role role) {
        this.role = role;
    }

    public void setEmail(@NotNull String email) {
        this.email = email;
    }



    public String getnTele() {
        return nTele;
    }
}