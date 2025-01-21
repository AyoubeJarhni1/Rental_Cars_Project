package com.rentalcars.backendspring.controller;

import com.rentalcars.backendspring.payload.request.RequestTicket;
import com.rentalcars.backendspring.payload.response.TicketResponse;
import com.rentalcars.backendspring.services.TicketService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class TicketController {

    private static final Logger logger = LoggerFactory.getLogger(TicketController.class);

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }


    @PostMapping("/createTicket")
    public ResponseEntity<TicketResponse> createTicket(
            @RequestParam Long reservationId,
            @RequestParam Float priceTotal) {
        try {
            TicketResponse ticketResponse = ticketService.createTicket(reservationId, priceTotal);
            return ResponseEntity.ok(ticketResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/tickets")
    public ResponseEntity<byte[]> createTicket(@RequestBody RequestTicket requestTicket) {
        try {

            TicketResponse ticketResponse = ticketService.createTicket(
                    requestTicket.getReservationId(),
                    requestTicket.getPriceTotal()
            );


            byte[] pdfBytes = ticketService.generateTicketPdf(ticketResponse);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename("ticket_" + ticketResponse.getId() + ".pdf")
                    .build());


            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (RuntimeException e) {

            logger.error("Erreur lors de la création ou génération du ticket : ", e);


            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            logger.error("Erreur générale : ", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
