package com.rentalcars.backendspring.services;

import com.rentalcars.backendspring.models.User;
import com.rentalcars.backendspring.payload.response.UserResponseDto;
import com.rentalcars.backendspring.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDto findUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("user not found ");  // Return 404 if user not found
        }
        return UserResponseDto.builder()
                .id(user.getId())
                .dateNaiss(user.getDateNaiss())
                .adress(user.getAdress())
                .email(user.getEmail())
                .nTele(user.getnTele())
                .build();
    }

    public UserResponseDto findUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("user not found ");
        }

        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .dateNaiss(user.getDateNaiss())
                .adress(user.getAdress())
                .email(user.getEmail())
                .nTele(user.getnTele())
                .password(user.getPassword())
                .build();
    }


    public String updateUserByEmail(String email, Map<String, Object> updates) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur avec l'email " + email + " non trouvé."));

        if (updates.containsKey("name")) {
            user.setName((String) updates.get("name"));
        }
        if (updates.containsKey("email")) {
            user.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("password")) {
            user.setPassword((String) updates.get("password"));
        }
        if (updates.containsKey("ntele")) {
            user.setnTele((String) updates.get("ntele"));
        }
        if (updates.containsKey("adress")) {
            user.setAdress((String) updates.get("adress"));
        }
        if (updates.containsKey("dateNaiss")) {
            try {
                String dateStr = (String) updates.get("dateNaiss");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date dateNaiss = sdf.parse(dateStr);
                user.setDateNaiss(dateNaiss);
            } catch (ParseException e) {
                throw new RuntimeException("Format de date invalide pour dateNaiss. Utilisez le format yyyy-MM-dd.");
            }
        }
        userRepository.save(user);
        return "Utilisateur mis à jour avec succès.";
    }


    public String updateUserByEmail1(String email, Map<String, Object> updates) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur avec l'email " + email + " non trouvé."));

        if (updates.containsKey("name")) {
            user.setName((String) updates.get("name"));
        }

        if (updates.containsKey("email")) {
            user.setEmail((String) updates.get("email"));
        }

        if (updates.containsKey("password")) {

            String newPassword = (String) updates.get("password");

            user.setPassword(passwordEncoder.encode(newPassword));
        }

        if (updates.containsKey("ntele")) {
            user.setnTele((String) updates.get("ntele"));
        }

        if (updates.containsKey("adress")) {
            user.setAdress((String) updates.get("adress"));
        }

        if (updates.containsKey("dateNaiss")) {
            try {
                String dateStr = (String) updates.get("dateNaiss");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date dateNaiss = sdf.parse(dateStr);
                user.setDateNaiss(dateNaiss);
            } catch (ParseException e) {
                throw new RuntimeException("Format de date invalide pour dateNaiss. Utilisez le format yyyy-MM-dd.");
            }
        }
        userRepository.save(user);
        return "Utilisateur mis à jour avec succès.";
    }


    public String updateUserById(Long id, Map<String, Object> updates) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur avec l'ID " + id + " non trouvé."));

        if (updates.containsKey("name")) {
            user.setName((String) updates.get("name"));
        }

        if (updates.containsKey("email")) {
            user.setEmail((String) updates.get("email"));
        }

        if (updates.containsKey("password")) {
            String newPassword = (String) updates.get("password");
            user.setPassword(passwordEncoder.encode(newPassword));
        }

        if (updates.containsKey("ntele")) {
            user.setnTele((String) updates.get("ntele"));
        }

        if (updates.containsKey("adress")) {
            user.setAdress((String) updates.get("adress"));
        }

        if (updates.containsKey("dateNaiss")) {
            try {
                String dateStr = (String) updates.get("dateNaiss");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date dateNaiss = sdf.parse(dateStr);
                user.setDateNaiss(dateNaiss);
            } catch (ParseException e) {
                throw new RuntimeException("Format de date invalide pour dateNaiss. Utilisez le format yyyy-MM-dd.");
            }
        }

        userRepository.save(user);
        return "Utilisateur mis à jour avec succès.";
    }



    public String updatePasswordByEmail(String email, Map<String, Object> updates) {
        String oldPassword = (String) updates.get("oldPassword");
        String newPassword = (String) updates.get("newPassword");
        String confirmPassword = (String) updates.get("confirmPassword");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur avec l'email " + email + " non trouvé."));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("L'ancien mot de passe est incorrect.");
        }

        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("Le mot de passe de confirmation ne correspond pas au nouveau mot de passe.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return "Mot de passe mis à jour avec succès.";
    }


}
