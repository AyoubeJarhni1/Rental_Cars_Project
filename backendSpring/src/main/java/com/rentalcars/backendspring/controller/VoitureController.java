package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.services.VoitureService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/voitures")
public class VoitureController {

    VoitureService voitureService;
    public VoitureController(VoitureService voitureService) {
        this.voitureService = voitureService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Voiture>> getAllVoitures() {
        List<Voiture> voitures = voitureService.getAllVoitures();
        if (voitures.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(voitures);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Voiture>> getVoituresDisponibles() {
        List<Voiture> voitures = voitureService.findAllVoituresDisponible();
        if (voitures.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(voitures);
    }

    @GetMapping("/disponibles1")
    public ResponseEntity<List<Voiture>> getAvailableCars(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<Voiture> availableCars = voitureService.findAvailableCars(startDate, endDate);
        return ResponseEntity.ok(availableCars);
    }
}
