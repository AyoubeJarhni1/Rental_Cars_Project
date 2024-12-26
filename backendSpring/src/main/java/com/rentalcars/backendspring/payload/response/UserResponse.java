package com.rentalcars.backendspring.payload.response;

import java.util.Date;

public class UserResponse {
    Long id;
    String name;
    String email;
    String nTele;
    String adress;
    Date dateNaiss;

    public String getAddress() {
        return adress;
    }

    public String getEmail() {
        return email;
    }
    public String getPhone() {
        return nTele;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.adress = address;
    }

    public Date getDateNaissance() {
        return dateNaiss;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaiss = dateNaissance;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
