package com.rentalcars.backendSpring.models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    // One-to-Many relationship: One role can have many users
    @OneToMany(mappedBy = "role")  // `role` refers to the field in User class
    private Set<User> users;

    public Role(String roleName) {
        this.nom=roleName;
    }

    public Role() {

    }


    // Getter for role name
    public String getNom() {
        return nom;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    // Getter for users associated with the role (optional)
    public Set<User> getUsers() {
        return users;
    }
}
