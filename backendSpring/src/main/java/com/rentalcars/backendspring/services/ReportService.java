package com.rentalcars.backendspring.services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rentalcars.backendspring.models.ReportData;
import com.rentalcars.backendspring.models.Reservation;
import com.rentalcars.backendspring.models.Voiture;
import com.rentalcars.backendspring.repository.ReservRepository;
import com.rentalcars.backendspring.repository.VoitureRepository;

@Service
public class ReportService {

    @Autowired
    private ReservRepository bookingRepository;

    @Autowired
    private VoitureRepository vehicleRepository;

    public ReportData getMonthlyReport() {
        LocalDateTime startOfMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth()).atStartOfDay();
        LocalDateTime endOfMonth = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth()).atTime(23, 59, 59);

        List<Reservation> bookings = bookingRepository.findBookingsBetweenDates(startOfMonth, endOfMonth);
        List<Voiture> rentedVehicles = vehicleRepository.findRentedVehiclesBetweenDates(startOfMonth, endOfMonth);

        double totalRevenue = bookings.stream()
                .mapToDouble(Reservation::getPrice)
                .sum();

        return new ReportData(bookings.size(), rentedVehicles.size(), totalRevenue);
    }

    public ReportData getWeeklyReport() {
        LocalDateTime startOfWeek = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).atStartOfDay();
        LocalDateTime endOfWeek = LocalDate.now().with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).atTime(23, 59, 59);

        List<Reservation> bookings = bookingRepository.findBookingsBetweenDates(startOfWeek, endOfWeek);
        List<Voiture> rentedVehicles = vehicleRepository.findRentedVehiclesBetweenDates(startOfWeek, endOfWeek);

        double totalRevenue = bookings.stream()
                .mapToDouble(Reservation::getPrice)
                .sum();

        return new ReportData(bookings.size(), rentedVehicles.size(), totalRevenue);
    }
}
