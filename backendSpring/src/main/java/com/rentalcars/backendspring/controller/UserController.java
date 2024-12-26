package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.config.JwtProvider;
import com.rentalcars.backendspring.models.User;
import com.rentalcars.backendspring.payload.response.UserResponseDto;
import com.rentalcars.backendspring.repository.UserRepository;
import com.rentalcars.backendspring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/getById/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.findUser(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("client/get/{email}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponseDto> getUserByEmail(@PathVariable String email) {
        UserResponseDto user = userService.findUserByEmail(email);
        return ResponseEntity.ok(user);
    }




    @PutMapping("client/update/{email}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateUser(
            @PathVariable String email,
            @RequestBody Map<String, Object> updates) {
        try {
            String message = userService.updateUserByEmail(email, updates);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            String message = userService.updateUserById(id, updates);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // 404 Not Found avec le message d'erreur
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur interne est survenue."); // 500 Internal Server Error pour les erreurs non gérées
        }
    }



    @GetMapping("/user/profile")
    public ResponseEntity<UserResponseDto> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Nom d'utilisateur à partir du contexte

        UserResponseDto user = userService.findUserByEmail(username);
        return ResponseEntity.ok(user);
    }


    @PutMapping("/update/password/{email}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updatePasswordByEmail(
            @PathVariable String email,
            @RequestBody Map<String, Object> updates) {
        try {

            String message = userService.updatePasswordByEmail(email, updates);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
