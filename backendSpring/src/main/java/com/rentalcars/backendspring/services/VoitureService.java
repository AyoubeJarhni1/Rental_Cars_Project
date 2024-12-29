package com.rentalcars.backendspring.services;


import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.payload.request.ReservationRequest;
import com.rentalcars.backendspring.payload.response.VoitureDTO;
import com.rentalcars.backendspring.repository.ReservRepository;
import com.rentalcars.backendspring.repository.VoitureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VoitureService {

    @Autowired
    VoitureRepository voitureRepository;
    @Autowired
    private ReservRepository reservRepository;

    @Autowired
    private static final Logger logger = LoggerFactory.getLogger(VoitureService.class);

    public VoitureService(VoitureRepository voitureRepository) {
        this.voitureRepository = voitureRepository;
    }

    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    public List<VoitureDTO> findAllVoituresDisponible() {
        List<Voiture> voitures = voitureRepository.findByStatus(Voiture.Status.valueOf("DISPONIBLE"));
        List<VoitureDTO> voitureDTOs = new ArrayList<>();

        for (Voiture voiture : voitures) {
            VoitureDTO voitureDTO = new VoitureDTO();
            voitureDTO.setId(voiture.getId());
            voitureDTO.setType(voiture.getType());
            voitureDTO.setMarque(voiture.getMarque());
            voitureDTO.setModele(voiture.getModele());
            voitureDTO.setPrix(voiture.getPrix());
            voitureDTO.setPathimage(voiture.getPathimage());
            voitureDTO.setStatus(voiture.getStatus().name());
            voitureDTO.setMatricule(voiture.getMatricule());


            voitureDTOs.add(voitureDTO);
        }

        return voitureDTOs;
    }

    public List<Voiture> findAvailableCars(LocalDate startDate, LocalDate endDate) {

        List<Voiture> allCars = voitureRepository.findAll();

        return allCars.stream()
                .filter(car -> isCarAvailable(car, startDate, endDate))
                .collect(Collectors.toList());
    }

    public List<VoitureDTO> findAvailableCarsDate(Date startDate, Date endDate) {

        List<Voiture> allCars = voitureRepository.findAvailableVoitures(startDate,endDate);
        List<VoitureDTO> voitureDTOs = new ArrayList<>();
        for (Voiture voiture : allCars) {
            VoitureDTO voitureDTO = new VoitureDTO();
            voitureDTO.setId(voiture.getId());
            voitureDTO.setType(voiture.getType());
            voitureDTO.setMarque(voiture.getMarque());
            voitureDTO.setModele(voiture.getModele());
            voitureDTO.setPrix(voiture.getPrix());
            voitureDTO.setPathimage(voiture.getPathimage());
            voitureDTO.setStatus(voiture.getStatus().name());
            voitureDTO.setMatricule(voiture.getMatricule());
            voitureDTOs.add(voitureDTO);
        }
return voitureDTOs;
    }


    private boolean isCarAvailable(Voiture car, LocalDate startDate, LocalDate endDate) {
        List<Reservation> reservations = reservRepository.findReservationsForCar(car.getId(), startDate, endDate);
        return reservations.isEmpty();
    }

    public List<Voiture> findAvailableCarsByDate(LocalDate startDate) {
        return voitureRepository.findAvailableCarsByDate(startDate);
    }


    public List<VoitureDTO> getAvailableVoitures(Date dateDebut, Date dateFin) {
        List<Voiture> voitures=voitureRepository.findAvailableVoitures(dateDebut,dateFin);
        List<VoitureDTO> voitureDTOs=new ArrayList<>();
        for (Voiture voiture : voitures) {
            VoitureDTO voitureDTO = new VoitureDTO();
            voitureDTO.setId(voiture.getId());
            voitureDTO.setType(voiture.getType());
            voitureDTO.setMarque(voiture.getMarque());
            voitureDTO.setModele(voiture.getModele());
            voitureDTO.setPrix(voiture.getPrix());
            voitureDTO.setPathimage(voiture.getPathimage());
            voitureDTO.setStatus(voiture.getStatus().name());
            voitureDTO.setMatricule(voiture.getMatricule());
            voitureDTOs.add(voitureDTO);
        }
        return voitureDTOs;
    }


    public Voiture saveCar(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    public void deleteCar(Long id) {
        Optional<Voiture> voitureOptional=voitureRepository.findById(id);
        if (voitureOptional.isPresent()) {
            Voiture voiture = voitureOptional.get();

            if (voiture.getStatus() == Voiture.Status.RESERVEE) {
                throw new IllegalStateException("Cannot delete a car with status RESERVEE");
            }
            if (voiture.getReservationset() != null) {
                boolean hasActiveReservations = voiture.getReservationset().stream()
                        .anyMatch(reservation -> {
                            Instant reservationStartDate = reservation.getDateDb().toInstant();
                            Instant currentDate = LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant();
                            return reservationStartDate.isAfter(currentDate);
                        });

                if (hasActiveReservations) {
                    throw new IllegalStateException("Cannot delete a car that has future reservations");
                }
            }
            voitureRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Car with id " + id + " does not exist");
        }

        voitureRepository.deleteById(id);
    }

    public Voiture updateCar(Long id, Voiture voiture) {
        Voiture existingCar = voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        existingCar.setMarque(voiture.getMarque());
        existingCar.setModele(voiture.getModele());
        existingCar.setPathimage(voiture.getPathimage());
        existingCar.setPrix(voiture.getPrix());
        existingCar.setStatus(voiture.getStatus());
        existingCar.setType(voiture.getType());
        return voitureRepository.save(existingCar);
    }

    public String updateCar1(Long id, Voiture voiture) {
        Voiture existingCar = voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        existingCar.setMarque(voiture.getMarque());
        existingCar.setModele(voiture.getModele());
        existingCar.setPathimage(voiture.getPathimage());
        existingCar.setPrix(voiture.getPrix());
        existingCar.setStatus(voiture.getStatus());
        existingCar.setType(voiture.getType());
        voitureRepository.save(existingCar);
        return ("voiture updated successfully");
    }

    public List<VoitureDTO> findAllVoitures() {
        List<Voiture> voitures = voitureRepository.findAll();
        List<VoitureDTO> voitureDTOs = new ArrayList<>();

        for (Voiture voiture : voitures) {
            VoitureDTO voitureDTO = new VoitureDTO();
            voitureDTO.setId(voiture.getId());
            voitureDTO.setType(voiture.getType());
            voitureDTO.setMarque(voiture.getMarque());
            voitureDTO.setModele(voiture.getModele());
            voitureDTO.setPrix(voiture.getPrix());
            voitureDTO.setPathimage(voiture.getPathimage());
            voitureDTO.setStatus(voiture.getStatus().name());
            voitureDTO.setMatricule(voiture.getMatricule());


            voitureDTOs.add(voitureDTO);
        }

        return voitureDTOs;
    }



}
