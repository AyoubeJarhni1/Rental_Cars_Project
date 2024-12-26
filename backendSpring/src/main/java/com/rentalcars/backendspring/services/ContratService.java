package com.rentalcars.backendspring.services;

import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;  // Correct import
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;
import com.rentalcars.backendspring.models.Contrat;
import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.repository.ContratRepository;
import com.rentalcars.backendspring.repository.ReservRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date ;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class ContratService {

    private ContratRepository contratRepository;
    private ReservRepository reservRepository;

    public ContratService(ContratRepository contratRepository, ReservRepository reservRepository) {
        this.contratRepository = contratRepository;
        this.reservRepository = reservRepository;
    }

    public byte[] generateContractPdf(Long reservationId) throws IOException {

        Reservation reservation = reservRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));
        System.out.println("Réservation récupérée : " + reservation);

        Contrat contrat = contratRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException("Contrat non généré"));
        System.out.println("Contrat récupéré : " + contrat);

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String currentDateAndTime = formatter.format(new Date());

        long diffInMillies = Math.abs(reservation.getDateFin().getTime() - reservation.getDateDb().getTime());
        long numberOfDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);

        double pricePerDay = reservation.getVoiture().getPrix();
        double totalPrice = numberOfDays * pricePerDay;

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(outputStream);
        com.itextpdf.kernel.pdf.PdfDocument pdfDoc = new com.itextpdf.kernel.pdf.PdfDocument(writer);
        Document document = new Document(pdfDoc);
        document.add(new Paragraph("Contrat de Location").setBold().setFontSize(18));

        Table table = new Table(UnitValue.createPercentArray(2)).useAllAvailableWidth();
        table.addCell("Détail");
        table.addCell("Valeur");

        table.addCell("Date de génération du contrat");
        table.addCell(currentDateAndTime);
        table.addCell("Nom du Client");
        table.addCell(reservation.getUser().getName());
        table.addCell("Email du Client");
        table.addCell(reservation.getUser().getEmail());
        table.addCell("Numéro de téléphone du Client");
        table.addCell(reservation.getUser().getnTele());
        table.addCell("Adresse du Client");
        table.addCell(reservation.getUser().getAdress());
        table.addCell("Date de Naissance du Client");
        table.addCell(reservation.getUser().getDateNaiss().toString());
        table.addCell(" Status de réservation ");
        table.addCell(reservation.getVoiture().getStatus().toString());
        table.addCell(" Matricule de voiture  ");
        table.addCell(reservation.getVoiture().getMatricule().toString());


        table.addCell("Voiture");
        table.addCell(reservation.getVoiture().getMarque() + " " + reservation.getVoiture().getModele());
        table.addCell("Type de Voiture");
        table.addCell(reservation.getVoiture().getType());
        table.addCell("Prix par Jour");
        table.addCell(String.format("%.2f MAD", pricePerDay));


        table.addCell("Date de Début");
        table.addCell(reservation.getDateDb().toString());
        table.addCell("Date de Fin");
        table.addCell(reservation.getDateFin().toString());
        table.addCell("Nombre de Jours");
        table.addCell(String.valueOf(numberOfDays));
        table.addCell("Prix Total");
        table.addCell(String.format("%.2f MAD", totalPrice));

        table.addCell("Statut du Contrat");
        table.addCell(contrat.getStatut());
        document.add(table);
        document.add(new Paragraph("\nRègles de Location des Voitures :")
                .setBold().setFontSize(14).setUnderline());
        document.add(new Paragraph("1. Le conducteur doit respecter les limitations de vitesse et les lois locales."));
        document.add(new Paragraph("2. Le véhicule doit être restitué dans le même état qu'au moment de la location."));
        document.add(new Paragraph("3. En cas de dommage ou de panne, le locataire doit informer immédiatement l'agence."));
        document.add(new Paragraph("4. Le carburant consommé est à la charge du locataire."));
        document.add(new Paragraph("5. La période de location ne peut être modifiée sans approbation préalable."));
        document.add(new Paragraph("6. Tout dépassement du délai de location entraînera des frais supplémentaires."));

        document.close();
        return outputStream.toByteArray();
    }

}
