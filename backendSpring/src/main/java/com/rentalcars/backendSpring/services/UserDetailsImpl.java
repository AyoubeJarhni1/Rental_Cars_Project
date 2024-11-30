package com.rentalcars.backendSpring.services;

import com.rentalcars.backendSpring.models.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.rentalcars.backendSpring.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String email;

    @JsonIgnore
    private String password;

    private GrantedAuthority authority;  // Now it's a single authority, not a collection
    private Role role;  // Add the Role attribute

    // Constructor
    public UserDetailsImpl(Long id, String username, String email, String password, GrantedAuthority authority, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authority = authority;
        this.role = role;
    }

    // Static method to build UserDetailsImpl from User
    public static UserDetailsImpl build(User user) {
        // Since each user has only one role, we get the role's name and assign it as a single authority
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getNom());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authority,
                user.getRole()  // Set the Role in the constructor
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(authority);  // Wrap the single authority into a list
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Role getRole() {
        return role;  // Return the Role object
    }
}
