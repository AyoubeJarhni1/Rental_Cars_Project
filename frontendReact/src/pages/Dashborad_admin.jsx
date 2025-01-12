import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBarAdmin';
import '../Reports.css';

const Reports = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchReport = async (period) => {
        setLoading(true);
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        try {
            const response = await axios.get(`http://localhost:8080/reports?period=${period}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
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

                {reportData && (
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
