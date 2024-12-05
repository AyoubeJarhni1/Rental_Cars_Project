package com.rentalcars.backendSpring.services;

import com.rentalcars.backendSpring.models.Role;
import com.rentalcars.backendSpring.models.User;
import com.rentalcars.backendSpring.repository.RoleRepository;
import com.rentalcars.backendSpring.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    // Constructor injection for dependencies
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public void addUserWithRoleId(String username, String email, String password, String nTele, String adress, Date dateNaiss, Long roleId) {
        // Encoder le mot de passe avant de l'ajouter
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(password);

        // Récupérer le rôle avec l'ID spécifié
        Optional<Role> roleOptional = roleRepository.findById(roleId);

        if (roleOptional.isPresent()) {
            Role role = roleOptional.get();

            // Créer un nouvel utilisateur avec les paramètres donnés, y compris le rôle
            User user = new User(username, email, encodedPassword, nTele, adress, dateNaiss, role);  // Passer directement l'objet Role

            // Sauvegarder l'utilisateur dans la base de données
            userRepository.save(user);
        } else {
            throw new IllegalStateException("Rôle avec l'ID " + roleId + " non trouvé.");
        }
    }
}
