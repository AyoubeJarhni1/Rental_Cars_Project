package com.rentalcars.backendspring.services;

import com.rentalcars.backendspring.models.Contrat;
import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.User;
import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.repository.ContratRepository;
import com.rentalcars.backendspring.repository.ReservRepository;
import com.rentalcars.backendspring.repository.UserRepository;
import com.rentalcars.backendspring.repository.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ReservationService {
    @Autowired
    private ReservRepository reservRepository;

    @Autowired
    private VoitureRepository voitureRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ContratRepository contratRepository;

    public Reservation createReservation(Long userId, Long voitureId, Date dateDb, Date dateFin) {
        // Vérifier si la date de début est antérieure à la date de fin
        if (dateDb.after(dateFin)) {
            throw new RuntimeException("La date de début doit être antérieure à la date de fin.");
        }

        // Vérification des réservations existantes pour l'utilisateur et la voiture pendant cette période
        // Vérifier si l'utilisateur a déjà une réservation pour ces dates
        boolean userAlreadyReserved = reservRepository.existsByUserIdAndDateDbBetweenOrDateFinBetween(userId, dateDb, dateFin, dateDb, dateFin);
        if (userAlreadyReserved) {
            throw new RuntimeException("L'utilisateur a déjà une réservation pendant cette période.");
        }
        boolean carAlreadyReserved = reservRepository.existsByVoitureIdAndDateDbBetweenOrDateFinBetween(voitureId, dateDb, dateFin, dateDb, dateFin);
        if (carAlreadyReserved) {
            throw new RuntimeException("La voiture est déjà réservée pendant cette période.");
        }
        Reservation reservation = new Reservation();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Voiture voiture = voitureRepository.findById(voitureId)
                .orElseThrow(() -> new RuntimeException("Voiture non trouvée"));
        reservation.setUser(user);
        reservation.setVoiture(voiture);
        reservation.setDateDb(dateDb);
        reservation.setDateFin(dateFin);

        reservation = reservRepository.save(reservation);

        Contrat contrat = new Contrat();
        contrat.setReservation(reservation);
        contrat.setStatut("En attente de paiement");
        contrat.setDateGeneration(new Date());
        contratRepository.save(contrat);
        return reservation;
    }


}
