import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Dashboard';

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    
    useEffect(() => {
        const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:8080/voitures/disponibles');
            setCars(response.data);
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
            <div className="dashboard-cards">
            <Link to="/cars" className="dashboard-card">
                <h2>Cars</h2>
                <p>{cars.length}</p>
            </Link>
            <Link to="/users" className="dashboard-card">
                <h2>Users</h2>
                <p>0</p>
            </Link>
            <Link to="/bookings" className="dashboard-card">
                <h2>Bookings</h2>
                <p>0</p>
            </Link>
            </div>
        </div>
        </div>
    );
    };
    