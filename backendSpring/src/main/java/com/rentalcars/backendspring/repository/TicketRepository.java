package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.Ticket;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketRepository extends JpaRepository<Ticket,Long> {

    @Query("SELECT t FROM Ticket t WHERE t.dateGeneration BETWEEN :startOfMonth AND :endOfMonth")
    List<Ticket> findBookingsBetweenDates(LocalDate startOfMonth, LocalDate endOfMonth);



}
