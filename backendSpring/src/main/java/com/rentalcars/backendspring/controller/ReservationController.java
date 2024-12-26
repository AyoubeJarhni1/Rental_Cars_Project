package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.models.Reservation;

import com.rentalcars.backendspring.payload.request.ReservatDTO;
import com.rentalcars.backendspring.payload.request.ReservationRequest;
import com.rentalcars.backendspring.payload.response.ReservationResponse;
import com.rentalcars.backendspring.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

   /* @PostMapping("/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Reservation> saveReservation(@RequestBody ReservationRequest request) {
        Reservation reservation = reservationService.createReservation1(
                request.getUserId(),
                request.getVoitureId(),
                request.getDateDb(),
                request.getDateFin()
        );
        return ResponseEntity.ok(reservation);
    }*/


  /*  @PostMapping("/createRese")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequest request) {

        Reservation reservation = reservationService.createReservation1(
                request.getUserId(),
                request.getVoitureId(),
                request.getDateDb(),
                request.getDateFin()
        );
        Map<String, Object> response = new HashMap<>();
        response.put("id", reservation.getId());
        response.put("dateDb", reservation.getDateDb());
        response.put("dateFin", reservation.getDateFin());
        response.put("voiture", reservation.getVoiture());
        response.put("user", reservation.getUser());
        response.put("message", "Réservation et contrat générés avec succès !");

        return ResponseEntity.ok(response);
    }*/


   /* @PostMapping("/createRes")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createReservationUni(@RequestBody ReservationRequest request) {

        // Appeler le service pour créer une réservation
        Reservation reservation = reservationService.createReservation1(
                request.getUserId(),
                request.getVoitureId(),
                request.getDateDb(),
                request.getDateFin()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("id", reservation.getId());
        response.put("reservation", reservation);

        return ResponseEntity.ok(response);
    }
*/
    @PostMapping("/good")
    public ResponseEntity<ReservationResponse> reserver(@RequestBody ReservationRequest reservationRequest) {
        try {
            ReservationResponse response = reservationService.createReservation(reservationRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.ok("Réservation supprimée avec succès.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la suppression de la réservation.");
        }
    }


/*

    @PostMapping("/createReservation")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createReservationDt(@RequestBody ReservatDto request) {

        Reservation reservation = reservationService.createReservation1(
                request.getUserId(),
                request.getVoitureId(),
                request.getDateDb(),
                request.getDateFin()
        );
        Map<String, Object> response = new HashMap<>();
        response.put("id", reservation.getId());
        response.put("dateDb", reservation.getDateDb());
        response.put("dateFin", reservation.getDateFin());
        response.put("voiture", reservation.getVoiture());
        response.put("user", reservation.getUser());
        response.put("message", "Réservation et contrat générés avec succès !");

        return ResponseEntity.ok(response);
    }

*/


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUser(@PathVariable Long userId) {
        List<Reservation> reservations = reservationService.findByUserId(userId);
        if (reservations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reservations);
    }


    @GetMapping("/users/{userId}")
    public ResponseEntity<List<ReservatDTO>> getReservationsByUserId(@PathVariable Long userId) {
        List<ReservatDTO> reservations = reservationService.getReservationsByUserId(userId);
        if (reservations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reservations);
    }


}
