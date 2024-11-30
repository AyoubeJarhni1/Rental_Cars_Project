package com.rentalcars.backendSpring.controller;

import com.rentalcars.backendSpring.models.Role;
import com.rentalcars.backendSpring.models.User;
import com.rentalcars.backendSpring.payload.request.LoginRequest;
import com.rentalcars.backendSpring.payload.request.SignupRequest;
import com.rentalcars.backendSpring.payload.response.JwtResponse;
import com.rentalcars.backendSpring.payload.response.MessageResponse;
import com.rentalcars.backendSpring.repository.RoleRepository;
import com.rentalcars.backendSpring.repository.UserRepository;
import com.rentalcars.backendSpring.config.JwtUtils;
import com.rentalcars.backendSpring.services.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    // Authentification utilisateur (connexion)
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getRole().getNom()  // Récupère le nom du rôle
        ));
    }

    @GetMapping("/test")
    String test() {
        return "test";
    }

    @PostMapping("/api/auth/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        log.info("Sign up request received for email: {}", signUpRequest.getEmail());

        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            log.warn("Attempt to register with an already used email: {}", signUpRequest.getEmail());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Créer un nouvel utilisateur
        log.debug("Creating a new user with username: {} and email: {}", signUpRequest.getUsername(), signUpRequest.getEmail());
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());

        // Encode the password
        String encodedPassword = encoder.encode(signUpRequest.getPassword());
        log.debug("Encoded password for user: {}", encodedPassword);
        user.setPassword(encodedPassword);

        // Déterminer et attribuer le rôle
        log.debug("Looking for role: ROLE_{}", signUpRequest.getRole());
        Role userRole = roleRepository.findByNom("ROLE_" + signUpRequest.getRole())
                .orElseThrow(() -> {
                    log.error("Role not found for: ROLE_{}", signUpRequest.getRole());
                    return new RuntimeException("Error: Role not found.");
                });

        log.debug("Assigning role {} to the user", userRole.getNom());
        user.setRole(userRole);

        // Save the new user
        userRepository.save(user);
        log.info("User {} registered successfully with email: {}", user.getUsername(), user.getEmail());

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
