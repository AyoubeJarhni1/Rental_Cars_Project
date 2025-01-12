package com.rentalcars.backendspring.services;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rentalcars.backendspring.models.Ticket;
import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.repository.TicketRepository;
import com.rentalcars.backendspring.repository.VoitureRepository;
import com.rentalcars.backendspring.models.ReportData;

@Service
public class ReportService {

    @Autowired
    private TicketRepository bookingRepository;

    @Autowired
    private VoitureRepository vehicleRepository;

    public ReportData getMonthlyReport() {
        LocalDate startOfMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());

        List<Ticket> bookings = bookingRepository.findBookingsBetweenDates(startOfMonth, endOfMonth);
        List<Voiture> rentedVehicles = vehicleRepository.findRentedVehiclesBetweenDates(startOfMonth, endOfMonth);

        double totalRevenue = bookings.stream()
                .mapToDouble(Ticket::getPriceTotal)
                .sum();

        return new ReportData(bookings.size(), rentedVehicles.size(), totalRevenue);
    }

    public ReportData getWeeklyReport() {
        LocalDate startOfWeek = LocalDate.now().minusDays(LocalDate.now().getDayOfWeek().getValue() - 1);
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        List<Ticket> bookings = bookingRepository.findBookingsBetweenDates(startOfWeek, endOfWeek);
        List<Voiture> rentedVehicles = vehicleRepository.findRentedVehiclesBetweenDates(startOfWeek, endOfWeek);

        double totalRevenue = bookings.stream()
                .mapToDouble(Ticket::getPriceTotal)
                .sum();

        return new ReportData(bookings.size(), rentedVehicles.size(), totalRevenue);
    }
}
