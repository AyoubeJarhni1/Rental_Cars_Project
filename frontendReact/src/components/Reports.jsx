import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/DashboardAdmin'; // Import Sidebar
import '../Reports.css';

const Reports = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noReservations, setNoReservations] = useState(false); // State to track if no reservations exist

    // Function to check if there are any reservations
    const checkReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reservation/count');
            return response.data.count > 0;
        } catch (error) {
            console.error("Error checking reservations:", error);
            return false;
        }
    };

    const fetchReport = async (period) => {
        setLoading(true);
        const reservationsExist = await checkReservations();

        if (!reservationsExist) {
            setNoReservations(true); // Set noReservations to true if no reservations are found
            setReportData(null); // Clear previous report data
            setLoading(false);
            return; // Exit the function early
        }

        setNoReservations(false); // Reset noReservations to false if reservations exist

        try {
            const response = await axios.get(`http://localhost:8080/reports?period=${period}`);
            setReportData(response.data);
        } catch (error) {
            console.error("Error fetching report:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar /> {/* Include Sidebar here */}
            <div className="report-content">
                <h1>Reports</h1>
                <div className="report-buttons">
                    <button onClick={() => fetchReport("monthly")}>Monthly Report</button>
                    <button onClick={() => fetchReport("weekly")}>Weekly Report</button>
                </div>

                {loading && <p>Loading report...</p>}

                {noReservations && <p>No reservations found in the database.</p>} {/* Show message if no reservations */}

                {reportData && !noReservations && (
                    <div className="report-details">
                        <h2>Report</h2>
                        <p>Total Bookings: {reportData.totalBookings}</p>
                        <p>Total Rented Vehicles: {reportData.totalRentedVehicles}</p>
                        <p>Total Revenue: ${reportData.totalRevenue}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
