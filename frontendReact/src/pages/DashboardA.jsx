import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import PriceChart from "../components/PriceChart";
import SidebarA from "../components/SideBarAdmin";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardA = () => {
  const [totalReservations, setTotalReservations] = useState(0);
  const [recentReservations, setRecentReservations] = useState([]);
  const [popularCar, setPopularCar] = useState(null);
  const [carPrices, setCarPrices] = useState([]);

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

         
          const prices = reservations.reduce((acc, curr) => {
            const totalPrice = curr.prix; 
            if (acc[curr.marque]) {
              acc[curr.marque] += totalPrice;
            } else {
              acc[curr.marque] = totalPrice;
            }
            return acc;
          }, {});
          setCarPrices(prices);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Préparer les données pour le graphique circulaire
  const carNames = Object.keys(carPrices);
  const carExpenses = Object.values(carPrices);

  const data = {
    labels: carNames,
    datasets: [
      {
        data: carExpenses,
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F0E130', '#FF9133'], 
        hoverBackgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F0E130', '#FF9133'],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/5 h-auto bg-white shadow-md p-0 m-0">
        <SidebarA/>
      </div>
      <div className="w-4/5 container mx-auto ml-2 mr-6 p-4">
        <h1 className="text-2xl font-bold mt-6 text-center mb-6 text-[#2D90C4]">Bienvenue sur votre Tableau de bord</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2 text-primary4">Réservations Totales</h2>
            <p className="text-3xl font-semibold">{totalReservations}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2 text-primary4">Voiture la plus réservée</h2>
            <p className="text-gray-600">{popularCar || "Aucune donnée"}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2 text-primary4">Dernières Réservations</h2>
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
          <h2 className="text-2xl font-bold mb-4 text-primary4">Statistiques des Prix par Voiture</h2>
          <div style={{ width: "550px", height: "550px" } } className="mx-auto">
  <Pie data={data} />
</div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardA;
