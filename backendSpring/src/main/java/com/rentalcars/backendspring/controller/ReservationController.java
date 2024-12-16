package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.payload.request.ReservationRequest;
import com.rentalcars.backendspring.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Reservation> saveReservation(@RequestBody ReservationRequest request) {
        Reservation reservation = reservationService.createReservation(
                request.getUserId(),
                request.getVoitureId(),
                request.getDateDb(),
                request.getDateFin()
        );
        return ResponseEntity.ok(reservation);
    }


    @PostMapping("/createRes")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequest request) {

        Reservation reservation = reservationService.createReservation(
                request.getUserId(),
                request.getVoitureId(),
                request.getDateDb(),
                request.getDateFin()
        );
        Map<String, Object> response = new HashMap<>();
        response.put("id", reservation.getId()); // Ajoutez l'ID de la réservation
        response.put("dateDb", reservation.getDateDb());
        response.put("dateFin", reservation.getDateFin());
        response.put("voiture", reservation.getVoiture());
        response.put("user", reservation.getUser());
        response.put("message", "Réservation et contrat générés avec succès !");

        return ResponseEntity.ok(response);
    }


}
