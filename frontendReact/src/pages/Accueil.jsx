import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";
import axios from "axios";

const Dashboard = () => {
  const [totalReservations, setTotalReservations] = useState(0);
  const [recentReservations, setRecentReservations] = useState([]);
  const [popularCar, setPopularCar] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const idUser = localStorage.getItem("idUser");

      if (!token || !idUser) {
        alert("Vous devez être connecté pour voir votre tableau de bord.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/reservation/users/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.length > 0) {
          const reservations = response.data;
          setTotalReservations(reservations.length);
          setRecentReservations(reservations.slice(0, 3));
          const mostPopular = reservations.reduce((acc, curr) => {
            acc[curr.marque] = (acc[curr.marque] || 0) + 1;
            return acc;
          }, {});
          const popular = Object.entries(mostPopular).sort((a, b) => b[1] - a[1])[0];
          setPopularCar(popular ? popular[0] : null);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="   w-1/5 h-auto bg-white shadow-md p-0 m-0">
        <Sidebar />
      </div>
      <div className="w-4/5 container mx-auto ml-2 mr-6 p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">Bienvenue sur votre Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Réservations Totales</h2>
            <p className="text-3xl font-semibold">{totalReservations}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Voiture la plus réservée</h2>
            <p className="text-gray-600">{popularCar || "Aucune donnée"}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Dernières Réservations</h2>
            <ul className="space-y-2">
              {recentReservations.length > 0 ? (
                recentReservations.map((reservation) => (
                  <li key={reservation.reservationId} className="text-gray-600">
                    <strong>{reservation.marque}</strong> - {reservation.modele}
                    <br />
                    {reservation.dateDb} à {reservation.dateFin}
                  </li>
                ))
              ) : (
                <p>Aucune réservation récente.</p>
              )}
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Statistiques Générales</h2>
          <p className="text-gray-600">
            Visualisez les tendances des réservations pour une meilleure planification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
