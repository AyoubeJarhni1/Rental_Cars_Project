package com.rentalcars.backendspring.services;

import com.rentalcars.backendspring.models.User;
import com.rentalcars.backendspring.payload.response.UserResponseDto;
import com.rentalcars.backendspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    // Constructor injection for dependencies
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

    public User updateUser(String email, Map<String, Object> updates) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        updates.forEach((key, value) -> {
            switch (key) {
                case "name":
                    user.setName((String) value);
                    break;
                case "password":
                    user.setPassword((String) value);
                    break;
                case "adress":
                    user.setAdress((String) value);
                    break;
                case "ntele":
                    user.setnTele((String) value);
                    break;
                default:
                    break;
            }
        });

        return userRepository.save(user);
    }


    public String updateUserByEmail(String email, Map<String, Object> updates) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur avec l'email " + email + " non trouvé."));

        // Updating fields based on the received data
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

}
