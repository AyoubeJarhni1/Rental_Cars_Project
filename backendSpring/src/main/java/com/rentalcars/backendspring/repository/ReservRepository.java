package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.payload.request.ReservationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ReservRepository extends JpaRepository<Reservation,Long> {
    @Query("SELECT r FROM Reservation r WHERE r.voiture.id = :carId AND " +
            "((r.dateDb BETWEEN :startDate AND :endDate) OR (r.dateFin BETWEEN :startDate AND :endDate))")
    List<Reservation> findReservationsForCar(@Param("carId") Long carId,
                                             @Param("startDate") Date startDate,
                                             @Param("endDate") Date endDate);

    @Query("SELECT r FROM Reservation r WHERE (r.dateDb BETWEEN :startDate AND :endDate) OR (r.dateFin BETWEEN :startDate AND :endDate)")
    List<Reservation> findBookingsBetweenDates(@Param("startDate") LocalDateTime startDate,
                                               @Param("endDate") LocalDateTime endDate);
    @Override
    Reservation save(Reservation reservation);

    boolean existsByUserIdAndDateDbBetweenOrDateFinBetween(Long userId, Date dateDb, Date dateFin, Date dateDb1, Date dateFin1);

    boolean existsByVoitureIdAndDateDbBetweenOrDateFinBetween(Long voitureId, Date dateDb, Date dateFin, Date dateDb1, Date dateFin1);


    List<Reservation> findByUserId(Long userId);

    ReservationRequest save(ReservationRequest reservation);

    void deleteById(Long id);


}

