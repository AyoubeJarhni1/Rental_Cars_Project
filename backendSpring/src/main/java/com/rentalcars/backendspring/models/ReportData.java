package com.rentalcars.backendspring.models;

public class ReportData {

    private int totalBookings;
    private int totalRentedVehicles;
    private double totalRevenue;

    public ReportData(int totalBookings, int totalRentedVehicles, double totalRevenue) {
        this.totalBookings = totalBookings;
        this.totalRentedVehicles = totalRentedVehicles;
        this.totalRevenue = totalRevenue;
    }

    public int getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(int totalBookings) {
        this.totalBookings = totalBookings;
    }

    public int getTotalRentedVehicles() {
        return totalRentedVehicles;
    }

    public void setTotalRentedVehicles(int totalRentedVehicles) {
        this.totalRentedVehicles = totalRentedVehicles;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
