package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.payload.request.DateRangeRequest;
import com.rentalcars.backendspring.payload.response.VoitureDTO;
import com.rentalcars.backendspring.services.VoitureService;
import org.jboss.logging.BasicLogger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/voitures")
public class VoitureController {

    VoitureService voitureService;
    public VoitureController(VoitureService voitureService) {
        this.voitureService = voitureService;
    }

    private static final Logger logger = LoggerFactory.getLogger(VoitureController.class);


    @GetMapping("/all")
    public ResponseEntity<List<Voiture>> getAllVoitures() {
        List<Voiture> voitures = voitureService.getAllVoitures();
        if (voitures.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(voitures);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<VoitureDTO>> getVoituresDisponibles() {
        List<VoitureDTO> voitures = voitureService.findAllVoituresDisponible();
        if (voitures.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(voitures);
    }

 @PostMapping("/availlableDate")
    public ResponseEntity<List<VoitureDTO>> findAvailableCars(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {

        List<VoitureDTO> availableCars = voitureService.findAvailableCarsDate(startDate, endDate);
        return ResponseEntity.ok(availableCars);
    }

    @PostMapping("/disponiblesDate")
    public List<VoitureDTO> getAvailableVoitures(
            @RequestBody DateRangeRequest dateRangeRequest) {

        Date dateDebut = dateRangeRequest.getDateDebut();
        Date dateFin = dateRangeRequest.getDateFin();

        return voitureService.getAvailableVoitures(dateDebut, dateFin);
    }


    @PostMapping("/add")
    public ResponseEntity<Voiture> addCar(@RequestBody Voiture voiture) {
        Voiture newCar = voitureService.saveCar(voiture);
        return ResponseEntity.status(201).body(newCar);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Voiture> updateCar(@PathVariable Long id, @RequestBody Voiture voiture) {
        Voiture updatedCar = voitureService.updateCar(id, voiture);
        return ResponseEntity.ok(updatedCar);
    }
    @PutMapping("/update/{id}")
    public String updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture){
        return voitureService.updateCar1(id, voiture);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        voitureService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/allCars")
    public ResponseEntity<List<VoitureDTO>> getAllVoituresAdmin() {
        List<VoitureDTO> voitures = voitureService.findAllVoitures();
        if (voitures.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(voitures);
    }


    @PutMapping("/status/{id}")
    public ResponseEntity<String> updateCarStatus(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String status = requestBody.get("status");

        try {

            Voiture.Status parsedStatus = Voiture.Status.valueOf(status.toUpperCase());
            String response = voitureService.updateCarStatus(id, parsedStatus);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            logger.debug("Statut fourni invalide : {}", status, e);
            return ResponseEntity.badRequest().body("Statut invalide fourni : " + status);
        } catch (Exception e) {
            logger.error("Une erreur est survenue lors de la mise à jour du statut pour l'ID {}", id, e);
            return ResponseEntity.status(500).body("Une erreur interne est survenue.");
        }
    }




}
