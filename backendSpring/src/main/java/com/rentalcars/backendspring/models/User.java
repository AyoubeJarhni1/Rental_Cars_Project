package com.rentalcars.backendspring.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String password;
    private String nTele;
    private String adress;
    private Date dateNaiss;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    Set<Reservation> reservations=new HashSet<>();




    public User(String email, String encode) {
        this.email = email;
        this.password = encode;
    }

    public User(String email, String encode, String nTele, String adress, Date dateNaiss, Role role) {
        this.email = email;
        this.password = encode;
        this.nTele = nTele;
        this.adress = adress;
        this.dateNaiss = dateNaiss;
        this.role = role;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.name()));
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public void setPassword(String encode) {
        this.password = encode;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public void setAdress(String adress) {
        this.adress = adress;
    }


    public void setDateNaiss(Date dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public void setNTele(String value) {
        this.nTele = value;
    }


    public void setnTele(String nTele) {
        this.nTele = nTele;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getnTele() {
        return nTele;
    }

    public String getAdress() {
        return adress;
    }

    public Date getDateNaiss() {
        return dateNaiss;
    }

    public Role getRole() {
        return role;
    }



    public String getName() {
        return name;
    }

    public void setAddress(String address) {
        this.adress = address;
    }
    public String getAddress() {
        return adress;
    }

    public void setName(@NotBlank String name) {
        this.name=name;
    }


}
