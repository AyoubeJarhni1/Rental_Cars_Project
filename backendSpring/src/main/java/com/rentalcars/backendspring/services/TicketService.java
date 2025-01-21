package com.rentalcars.backendspring.services;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.Ticket;
import com.rentalcars.backendspring.models.User;
import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.payload.response.TicketResponse;
import com.rentalcars.backendspring.repository.ReservRepository;
import com.rentalcars.backendspring.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.element.LineSeparator;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.io.ByteArrayOutputStream;
import java.io.ByteArrayOutputStream;

import static javax.swing.text.StyleConstants.setFontSize;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private ReservRepository reservationRepository;

    public TicketResponse createTicket(Long reservationId, Float priceTotal) {

        LocalDateTime currentDate = LocalDateTime.now();
        Date currentDateAsDate = java.util.Date.from(currentDate.atZone(java.time.ZoneId.systemDefault()).toInstant());
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));
        User user = reservation.getUser();
        Voiture voiture = reservation.getVoiture();

        Ticket ticket = new Ticket();
        ticket.setReservation(reservation);
        ticket.setPriceTotal(priceTotal);
        ticket.setDateGeneration(currentDateAsDate);
        ticket = ticketRepository.save(ticket);

        TicketResponse ticketResponse = new TicketResponse();
        ticketResponse.setId(ticket.getId());
        ticketResponse.setDateDb(reservation.getDateDb());
        ticketResponse.setDateFn(reservation.getDateFin());
        ticketResponse.setPriceTotal(priceTotal);
        ticketResponse.setNameClient(user.getName());
        ticketResponse.setNTele(user.getnTele());
        ticketResponse.setMatricule(voiture.getMatricule());
        ticketResponse.setMarqueCar(voiture.getMarque());
        ticketResponse.setDateGeneration(ticket.getDateGeneration());



        generateTicketPdf(ticketResponse);

        return ticketResponse;
    }


    @Value("${pdf.file.path}")
    private String pdfFilePath;

    public byte[] generateTicketPdf(TicketResponse ticketResponse) {
        try {
            LocalDateTime currentDate = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            String formattedDate = currentDate.format(formatter);


            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(outputStream);
            com.itextpdf.kernel.pdf.PdfDocument pdfDocument = new com.itextpdf.kernel.pdf.PdfDocument(writer);
            Document document = new Document(pdfDocument);

            com.itextpdf.kernel.colors.Color titleBackgroundColor = ColorConstants.LIGHT_GRAY;
            Paragraph title = new Paragraph("Ticket de Paiement")
                    .setFontSize(20)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setBackgroundColor(titleBackgroundColor)
                    .setMarginBottom(20)
                    .setPadding(10);
            document.add(title);

            SolidLine line = new SolidLine();
            line.setLineWidth(1f);
            LineSeparator separator = new LineSeparator(line);
            document.add(separator);

            Paragraph details = new Paragraph()
                    .setFontSize(12)
                    .setMarginBottom(10)
                    .add("Numéro de Ticket : ").add(new Paragraph(String.valueOf(ticketResponse.getId())).setBold())
                    .add("\nDate de Génération : ").add(new Paragraph(formattedDate).setBold())
                    .add("\nPrix Total : ").add(new Paragraph(ticketResponse.getPriceTotal() + " MAD").setBold())
                    .add("\nNom du Client : ").add(new Paragraph(ticketResponse.getNameClient()).setBold())
                    .add("\nTéléphone : ").add(new Paragraph(ticketResponse.getNTele()).setBold())
                    .add("\nMarque de Voiture : ").add(new Paragraph(ticketResponse.getMarqueCar()).setBold())
                    .add("\nMatricule : ").add(new Paragraph(ticketResponse.getMatricule()).setBold())
                    .add("\nDate Début : ").add(new Paragraph(ticketResponse.getDateDb().toString()).setBold())
                    .add("\nDate Fin : ").add(new Paragraph(ticketResponse.getDateFn().toString()).setBold());
            document.add(details);

            Paragraph thankYouMessage = new Paragraph("Merci pour votre réservation !")
                    .setFontSize(14)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(ColorConstants.GREEN)
                    .setMarginTop(20);
            document.add(thankYouMessage);

            document.close();


            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du PDF : " + e.getMessage());
        }
    }





}



