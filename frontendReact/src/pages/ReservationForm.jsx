import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = ({ car, onClose }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    dateNaiss: "",
    beginDate: "",
    endDate: "",
    adress: "",
    ntele: "",
    idUser: "",
  });

  const [reservationId, setReservationId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const idUser = localStorage.getItem("idUser");

    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo({
        ...userInfo,
        name: parsedUserInfo.name,
        email: parsedUserInfo.email,
        dateNaiss: formatDate(parsedUserInfo.dateNaiss),
        adress: parsedUserInfo.adress,
        ntele: parsedUserInfo.ntele,
        idUser: idUser || parsedUserInfo.idUser || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté pour effectuer une réservation.");
      return;
    }

    try {
      const reservationData = {
        userId: userInfo.idUser,
        voitureId: car.id,
        dateDb: userInfo.beginDate,
        dateFin: userInfo.endDate,
      };

      const response = await axios.post(
        "http://localhost:8080/reservation/createRes",
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const createdReservationId = response.data.id;
        if (createdReservationId) {
          localStorage.setItem("reservationId", createdReservationId); 
          setReservationId(createdReservationId);
          alert(`Réservation effectuée avec succès ! ID de la réservation : ${createdReservationId}`);
        } else {
          alert("Erreur : ID de réservation introuvable.");
        }
      }
    } catch (error) {
      alert("Impossible d'effectuer la réservation. Voiture Reservée.");
    }
  };

  const handleGenerateContract = async () => {
    const reservationIdFromStorage = localStorage.getItem("reservationId");

    if (!reservationIdFromStorage) {
      alert("ID de réservation non trouvé. Veuillez d'abord effectuer une réservation.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté pour générer un contrat.");
      return;
    }

    try {
      const contractResponse = await axios.get(
        `http://localhost:8080/api/reservation/contrat/download/${reservationIdFromStorage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = contractResponse.data;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `contrat_${reservationIdFromStorage}.pdf`;
      link.click();

      alert("Contrat généré et téléchargé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la génération du contrat :", error);
      alert("Impossible de générer le contrat. Veuillez réessayer.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Réserver la voiture: {car.marque} {car.modele} de matricule {car.id}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Adresse */}
          <div>
            <label htmlFor="adress" className="block text-gray-700 font-medium">
              Adresse
            </label>
            <input
              type="text"
              id="adress"
              name="adress"
              value={userInfo.adress}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Numéro de téléphone */}
          <div>
            <label htmlFor="ntele" className="block text-gray-700 font-medium">
              Numéro de téléphone
            </label>
            <input
              type="text"
              id="ntele"
              name="ntele"
              value={userInfo.ntele}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date de naissance */}
          <div>
            <label htmlFor="dateNaiss" className="block text-gray-700 font-medium">
              Date de naissance
            </label>
            <input
              type="date"
              id="dateNaiss"
              name="dateNaiss"
              value={userInfo.dateNaiss}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date début */}
          <div>
            <label htmlFor="beginDate" className="block text-gray-700 font-medium">
              Date de début
            </label>
            <input
              type="datetime-local"
              id="beginDate"
              name="beginDate"
              value={userInfo.beginDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date fin */}
          <div>
            <label htmlFor="endDate" className="block text-gray-700 font-medium">
              Date de fin
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={userInfo.endDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Réserver
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Annuler
            </button>
          </div>
        </form>

        {/* Bouton pour générer le contrat */}
        {reservationId && (
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGenerateContract}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Générer le Contrat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
