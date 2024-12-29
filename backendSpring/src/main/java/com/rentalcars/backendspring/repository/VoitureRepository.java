package com.rentalcars.backendspring.repository;


import com.rentalcars.backendspring.models.Voiture;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    @Override
    <S extends Voiture> List<S> findAll(Example<S> example);

    List<Voiture> findByStatus(Voiture.Status status);

    @Query("SELECT v FROM Voiture v WHERE v.id NOT IN (SELECT r.voiture.id FROM Reservation r WHERE r.dateDb <= :startDate AND r.dateFin >= :startDate)")
    List<Voiture> findAvailableCarsByDate(@Param("startDate") LocalDate startDate);

    @Query("SELECT v FROM Voiture v WHERE v.id NOT IN " +
            "(SELECT r.voiture.id FROM Reservation r WHERE " +
            "(r.dateDb BETWEEN :dateDebut AND :dateFin AND r.dateFin BETWEEN :dateDebut AND :dateFin) " +
            "AND r.status = 'COMPLETE')")
    List<Voiture> findAvailableVoitures(@Param("dateDebut") Date dateDebut, @Param("dateFin") Date dateFin);


}
