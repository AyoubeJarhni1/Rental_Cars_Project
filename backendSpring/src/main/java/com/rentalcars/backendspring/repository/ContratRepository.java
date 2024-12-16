package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, Long> {
    Optional<Contrat> findByReservationId(Long reservationId);
}
