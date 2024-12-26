package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, Long> {

    Optional<Contrat> findByReservationId(Long reservationId);

    @Modifying
    @Query("DELETE FROM Contrat c WHERE c.reservation.id = :reservationId")
    void deleteByReservationId(@Param("reservationId") Long reservationId);
}
