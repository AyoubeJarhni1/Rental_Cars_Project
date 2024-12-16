package com.rentalcars.backendspring.services;

import com.rentalcars.backendspring.config.JwtProvider;
import com.rentalcars.backendspring.models.User;
import com.rentalcars.backendspring.payload.request.LoginRequest;
import com.rentalcars.backendspring.payload.request.SignupRequest;
import com.rentalcars.backendspring.payload.response.JwtResponse;
import com.rentalcars.backendspring.payload.response.MessageResponse;
import com.rentalcars.backendspring.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder encoder, JwtProvider jwtProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtProvider = jwtProvider;
        this.authenticationManager = authenticationManager;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        log.info("start authenticating user with email {}", loginRequest.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        log.info("user authenticated {}", loginRequest.getEmail());
        var user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + loginRequest.getEmail()));
        var jwtToken = jwtProvider.generateToken(user);
        log.info("Authenticate user successfully {}", loginRequest.getEmail());
        return new JwtResponse(jwtToken, user.getEmail());
    }

    public MessageResponse registerUser(SignupRequest signUpRequest) {
        log.info("Sign up request received for email: {}", signUpRequest.getEmail());

        if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
            log.info("Attempt to register with an already used email: {}", signUpRequest.getEmail());
            return new MessageResponse("Error: Email is already in use!");
        }
        log.info("Creating a new user with email: {}", signUpRequest.getEmail());
        User user = new User(signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole());
        user.setName(signUpRequest.getName());
        user.setnTele(signUpRequest.getnTele());
        user.setAddress(signUpRequest.getAddress());
        user.setDateNaiss(signUpRequest.getDateNaiss());
        user.setRole(signUpRequest.getRole());
        userRepository.save(user);
        log.info("User {} registered successfully with email: {}", user.getUsername(), user.getEmail());
        return new MessageResponse("User registered successfully!");
    }
}
