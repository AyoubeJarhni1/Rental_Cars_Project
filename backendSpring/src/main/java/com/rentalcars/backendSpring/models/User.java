package com.rentalcars.backendSpring.models;

import com.rentalcars.backendSpring.services.UserDetailsImpl;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String nTele;  // Numéro de téléphone
    private String adress;
    private Date dateNaiss;



    // Many-to-One relationship: Each user has one role
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public User(Object username, String email, String encode) {
        this.username = username.toString();
        this.email = email;
        this.password = encode;
    }

    public User(Object username, String email, String encode, String nTele, String adress, Date dateNaiss,Role role) {
        this.username = username.toString();
        this.email = email;
        this.password = encode;
        this.nTele = nTele;
        this.adress = adress;
        this.dateNaiss = dateNaiss;
        this.role = role;

    }

    public User() {

    }



    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    // Setters if needed
    public void setRole(Role role) {
        this.role = role;
    }

    public void setPassword(String encode) {
        this.password = encode;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getnTele() {
        return nTele;
    }

    public void setnTele(String nTele) {
        this.nTele = nTele;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Date getDateNaiss() {
        return dateNaiss;
    }

    public void setDateNaiss(Date dateNaiss) {
        this.dateNaiss = dateNaiss;
    }
}
