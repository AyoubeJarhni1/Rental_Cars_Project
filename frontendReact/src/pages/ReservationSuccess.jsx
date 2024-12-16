import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ReservationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservationId } = location.state || {};

  const handleGenerateContract = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour générer un contrat.");
      return;
    }

    try {
      const contractResponse = await axios.get(
        `http://localhost:8080/api/reservation/contrat/download/${reservationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const blob = contractResponse.data;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `contrat_${reservationId}.pdf`;
      link.click();

      alert("Contrat généré et téléchargé avec succès !");
    } catch (error) {
      alert("Impossible de générer le contrat. Veuillez réessayer.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Réservation réussie !</h1>
        <p className="mb-6">Votre réservation ID : <b>{reservationId}</b></p>
        <div className="flex justify-around">
          <button
            onClick={handleGenerateContract}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Générer le Contrat
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccess;
