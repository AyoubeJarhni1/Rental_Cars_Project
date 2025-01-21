package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.ReservationStatus;
import com.rentalcars.backendspring.models.User;
import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.payload.request.ReservationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ReservRepository extends JpaRepository<Reservation,Long> {

    @Query("SELECT r FROM Reservation r WHERE r.voiture.id = :carId AND " +
            "((r.dateDb BETWEEN :startDate AND :endDate) OR (r.dateFin BETWEEN :startDate AND :endDate))")
    List<Reservation> findReservationsForCar(@Param("carId") Long carId,
                                             @Param("startDate") LocalDate startDate,
                                             @Param("endDate") LocalDate endDate);

    @Override
    Reservation save(Reservation reservation);

    boolean existsByUserIdAndDateDbBetweenOrDateFinBetween(Long userId, Date dateDb, Date dateFin, Date dateDb1, Date dateFin1);

    boolean existsByVoitureIdAndDateDbBetweenOrDateFinBetween(Long voitureId, Date dateDb, Date dateFin, Date dateDb1, Date dateFin1);


    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByUserIdAndStatus(Long userId, ReservationStatus status);

    ReservationRequest save(ReservationRequest reservation);

    void deleteById(Long id);

    boolean existsByVoitureAndDateDbLessThanEqualAndDateFinGreaterThanEqual(Voiture voiture, Date dateFin, Date dateDb);
    boolean existsByUserAndDateDbLessThanEqualAndDateFinGreaterThanEqual(User user, Date dateFin, Date dateDb);


    List<Reservation> findAllByStatusOrderByIdDesc(ReservationStatus status);

    @Query("SELECT r FROM Reservation r WHERE (DATE(:currentDate) = DATE(r.dateDb) OR (DATE(:currentDate) BETWEEN DATE(r.dateDb) AND DATE(r.dateFin))) AND r.status = :status")
    List<Reservation> findByDateReservationAAndStatus(@Param("currentDate") LocalDate currentDate, @Param("status") ReservationStatus status);

}

