package com.rentalcars.backendspring.services;


import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.repository.ReservRepository;
import com.rentalcars.backendspring.repository.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoitureService {

    @Autowired
    VoitureRepository voitureRepository;
    @Autowired
    private ReservRepository reservRepository;

    public VoitureService(VoitureRepository voitureRepository) {
        this.voitureRepository = voitureRepository;
    }

    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }
    public List<Voiture> findAllVoituresDisponible() {
        return voitureRepository.findByStatus(Voiture.Status.DISPONIBLE);
    }

    public List<Voiture> findAvailableCars(LocalDate startDate, LocalDate endDate) {

        List<Voiture> allCars = voitureRepository.findAll();

        return allCars.stream()
                .filter(car -> isCarAvailable(car, startDate, endDate))
                .collect(Collectors.toList());
    }

    private boolean isCarAvailable(Voiture car, LocalDate startDate, LocalDate endDate) {
        // Vérifier si la voiture est réservée pendant la période demandée
        List<Reservation> reservations = reservRepository.findReservationsForCar(car.getId(), startDate, endDate);

        // Si aucune réservation n'est trouvée pour cette période, la voiture est disponible
        return reservations.isEmpty();
    }

}
