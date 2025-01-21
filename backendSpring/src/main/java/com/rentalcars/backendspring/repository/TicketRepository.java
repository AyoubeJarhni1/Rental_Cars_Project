package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,Long> {



}
