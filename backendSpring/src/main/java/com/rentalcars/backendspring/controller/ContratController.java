package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.services.ContratService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/reservation")
public class ContratController {

    @Autowired
    ContratService contratService;

    public ContratController(ContratService contratService) {
        this.contratService = contratService;
    }

    @GetMapping("/contrat/download/{reservationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<byte[]> downloadContract(@PathVariable Long reservationId) throws IOException {

        byte[] pdfBytes = contratService.generateContractPdf(reservationId);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=contrat_" + reservationId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

}
