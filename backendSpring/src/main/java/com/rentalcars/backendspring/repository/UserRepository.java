package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.itextpdf.kernel.pdf.PdfName.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Override
    <S extends User> List<S> findAll(Example<S> example);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    //Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
}
