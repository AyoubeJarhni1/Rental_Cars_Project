package com.rentalcars.backendspring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rentalcars.backendspring.models.ReportData;
import com.rentalcars.backendspring.services.ReportService;

@RestController
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/reports")
    public ReportData getReport(@RequestParam String period) {
        if ("monthly".equalsIgnoreCase(period)) {
            return reportService.getMonthlyReport();
        } else if ("weekly".equalsIgnoreCase(period)) {
            return reportService.getWeeklyReport();
        }
        return null;
    }
}
