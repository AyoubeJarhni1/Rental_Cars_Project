import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/DashboardAdmin';
import { Link } from 'react-router-dom';
import '../Dashboard.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const token = localStorage.getItem("token");

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch cars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:8080/voitures/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const carData = Array.isArray(response.data) ? response.data : response.data.cars || [];
                setCars(carData);
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };

        fetchCars();
    }, []);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Dashboard</h1>

                {/* Users Table */}
                <div className="user-table">
                    <div className="section-title">Users</div>
                    {users.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No users available.</p>
                    )}
                </div>

                {/* Cars Table */}
                <div className="car-table">
                    <div className="section-title">Cars</div>
                    {cars.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Brand</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(cars) && cars.length > 0 ? (
                                    cars.map((car) => (
                                        <tr key={car.id}>
                                            <td>{car.marque}</td>
                                            <td>{car.type}</td>
                                            <td>{car.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No cars available</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    ) : (
                        <p>No cars available.</p>
                    )}
                </div>

                {/* Button to navigate to Reports page */}
                <div className="reports-button">
                    <Link to="/reports">
                        <button className="report-btn">Go to Reports</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
