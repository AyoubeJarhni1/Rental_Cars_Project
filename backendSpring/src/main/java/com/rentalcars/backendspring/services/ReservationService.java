package com.rentalcars.backendspring.services;

import com.rentalcars.backendspring.models.*;
import com.rentalcars.backendspring.payload.request.ReservatDTO;
import com.rentalcars.backendspring.payload.request.ReservationRequest;
import com.rentalcars.backendspring.payload.response.ReservationResponse;
import com.rentalcars.backendspring.payload.response.UserResponse;
import com.rentalcars.backendspring.payload.response.VoitureResponse;
import com.rentalcars.backendspring.repository.ContratRepository;
import com.rentalcars.backendspring.repository.ReservRepository;
import com.rentalcars.backendspring.repository.UserRepository;
import com.rentalcars.backendspring.repository.VoitureRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Reservation createReservation1(Long userId, Long voitureId, Date dateDb, Date dateFin) {

        if (dateDb.after(dateFin)) {
            throw new RuntimeException("La date de début doit être antérieure à la date de fin.");
        }

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

    public List<Reservation> findByUserId(Long userId) {
        return reservRepository.findByUserId(userId);
    }


    public List<ReservatDTO> getReservationsByUserId(Long userId) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        List<Reservation> reservations = reservRepository.findByUserIdAndStatus(userId,ReservationStatus.COMPLETE);
        return reservations.stream().map(reservation -> {
            ReservatDTO dto = new ReservatDTO();
            dto.setReservationId(reservation.getId());
            dto.setMarque(reservation.getVoiture().getMarque());
            dto.setModele(reservation.getVoiture().getModele());
            dto.setType(reservation.getVoiture().getType());
            dto.setPathimage(reservation.getVoiture().getPathimage());
            dto.setPrix(reservation.getVoiture().getPrix());
            dto.setMatricule(reservation.getVoiture().getMatricule());
            dto.setDateDb(dateFormat.format(reservation.getDateDb()));
            dto.setDateFin(dateFormat.format(reservation.getDateFin()));
            return dto;
        }).collect(Collectors.toList());
    }


   /* public ReservationResponse reserver(ReservationRequest reservationRequest) {

        Optional<User> userOpt = userRepository.findById(reservationRequest.getUserId());
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("L'utilisateur avec l'ID " + reservationRequest.getUserId() + " n'existe pas.");
        }
        User user = userOpt.get();

        Optional<Voiture> voitureOpt = voitureRepository.findById(reservationRequest.getVoitureId());
        if (voitureOpt.isEmpty()) {
            throw new IllegalArgumentException("La voiture avec l'ID " + reservationRequest.getVoitureId() + " n'existe pas.");
        }
        Voiture voiture = voitureOpt.get();

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setVoiture(voiture);
        reservation.setDateDb(reservationRequest.getDateDb());
        reservation.setDateFin(reservationRequest.getDateFin());

        Reservation savedReservation = reservRepository.save(reservation);

        // Construire l'objet de réponse
        ReservationResponse response = new ReservationResponse();
        response.setId(savedReservation.getId());
        response.setDateDb(savedReservation.getDateDb());
        response.setDateFin(savedReservation.getDateFin());


        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getUsername());
        userResponse.setAddress(user.getAdress());
        userResponse.setDateNaissance(user.getDateNaiss());

        VoitureResponse voitureResponse = new VoitureResponse();
        voitureResponse.setId(voiture.getId());
        voitureResponse.setMarque(voiture.getMarque());
        voitureResponse.setModele(voiture.getModele());
        voitureResponse.setPrix(voiture.getPrix());
        voitureResponse.setPathimage(voiture.getPathimage());

        response.setUser(userResponse);
        response.setVoiture(voitureResponse);

        return response;
    }*/

    public ReservationResponse createReservation(ReservationRequest reservationRequest) {
        
        Optional<User> userOpt = userRepository.findById(reservationRequest.getUserId());
        if (!userOpt.isPresent()) {
            throw new IllegalArgumentException("Utilisateur non trouvé avec l'ID " + reservationRequest.getUserId());
        }

        Optional<Voiture> voitureOpt = voitureRepository.findById(reservationRequest.getVoitureId());
        if (!voitureOpt.isPresent()) {
            throw new IllegalArgumentException("Voiture non trouvée avec l'ID " + reservationRequest.getVoitureId());
        }

        boolean voitureDejaReservee = reservRepository.existsByVoitureAndDateDbLessThanEqualAndDateFinGreaterThanEqual(
                voitureOpt.get(),
                reservationRequest.getDateFin(),
                reservationRequest.getDateDb()
        );
        if (voitureDejaReservee) {
            throw new IllegalArgumentException("La voiture est déjà réservée pour la période choisie.");
        }
        boolean userReservationConflit = reservRepository.existsByUserAndDateDbLessThanEqualAndDateFinGreaterThanEqual(
                userOpt.get(),
                reservationRequest.getDateFin(),
                reservationRequest.getDateDb()
        );
        if (userReservationConflit) {
            throw new IllegalArgumentException("Vous avez déjà une réservation pendant cette période.");
        }

        LocalDate dateDb = reservationRequest.getDateDb().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate dateFin = reservationRequest.getDateFin().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate currentDate = LocalDate.now();

        if (dateDb.isAfter(dateFin)) {
            throw new IllegalArgumentException("La date de début doit être antérieure à la date de fin.");
        }

        if (dateDb.isBefore(currentDate) || dateFin.isBefore(currentDate)) {
            throw new IllegalArgumentException("Les dates ne peuvent pas être dans le passé.");
        }


        Reservation reservation = new Reservation();
        reservation.setUser(userOpt.get());
        reservation.setVoiture(voitureOpt.get());
        reservation.setDateDb(reservationRequest.getDateDb());
        reservation.setDateFin(reservationRequest.getDateFin());
        reservation.setStatus(ReservationStatus.EN_COURS);

        Reservation r=reservRepository.save(reservation);
        ReservationResponse reservationResponse=new ReservationResponse();
        reservationResponse.setId(r.getId());
        reservationResponse.setDateDb(r.getDateDb());
        reservationResponse.setDateFin(r.getDateFin());
        reservationResponse.setIdUser(r.getUser().getId());
        reservationResponse.setIdVoiture(r.getVoiture().getId());
        reservationResponse.setStatus(ReservationStatus.valueOf(r.getStatus().name()));

        Contrat contrat = new Contrat();
        contrat.setReservation(r);
        contrat.setStatut("En attente du paiement");
        contrat.setDateGeneration(new Date());
        Contrat c=contratRepository.save(contrat);

reservationResponse.setContratId(c.getId());
        return reservationResponse;

    }

    @Transactional
    public void deleteReservation(Long reservationId) {
        if (!reservRepository.existsById(reservationId)) {
            throw new IllegalArgumentException("La réservation avec cet ID n'existe pas.");
        }
        reservRepository.deleteById(reservationId);
        contratRepository.deleteByReservationId(reservationId);
    }

    public Reservation updateReservationStatus(long reservationId) {

        Optional<Reservation> reservationOptional = reservRepository.findById(reservationId);

        if (reservationOptional.isEmpty()) {
            throw new IllegalArgumentException("Réservation non trouvée");
        }
        Reservation reservation = reservationOptional.get();
        reservation.setStatus(ReservationStatus.COMPLETE);
        return reservRepository.save(reservation);
    }

}
