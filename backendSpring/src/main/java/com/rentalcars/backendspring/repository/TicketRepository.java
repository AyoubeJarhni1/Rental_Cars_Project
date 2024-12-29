package com.rentalcars.backendspring.repository;

import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket,Long> {



}
