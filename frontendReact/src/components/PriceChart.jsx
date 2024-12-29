import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Enregistrement des éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PriceChart = () => {
  const priceData = {
    labels: ["Voiture 1", "Voiture 2", "Voiture 3", "Voiture 4"],
    datasets: [
      {
        label: "Prix Total Dépensé",
        data: [250, 300, 350, 200], // Prix par voiture
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Couleurs
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Couleurs au survol
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-primary4">Répartition des Prix</h2>
      <Pie data={priceData} options={{ maintainAspectRatio: false, responsive: true }} height={200} width={200} />
    </div>
  );
};

export default PriceChart;
