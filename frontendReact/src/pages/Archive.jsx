import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";

const ReservationArchive = () => {
  // Function to calculate the date difference
  function calculateDateDifference(dateStart, dateEnd) {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    if (isNaN(start) || isNaN(end)) {
      return "Dates invalides";
    }

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    return differenceInDays > 0 ? `${differenceInDays} jour(s)` : "Dates incorrectes";
  }

  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("marque");
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // Fetch reservations from the API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const idUser = localStorage.getItem("idUser");

        if (!token || !idUser) {
          alert("Vous devez être connecté pour consulter vos réservations.");
          return;
        }

        const response = await fetch(`http://localhost:8080/reservation/users/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        if (response.status === 204) {
          console.log("Aucune réservation trouvée.");
          setReservations([]);
          return;
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchReservations();
  }, []);

  // Filter reservations based on search term and criteria
  const filteredReservations = reservations.filter((reservation) => {
    // Ensure the value is a string before calling toLowerCase
    const userSearch = (reservation[searchCriteria] || "").toString().toLowerCase();
    return userSearch.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex min-h-screen bg-primary5">
      <div className="w-1/5 h-screen bg-white shadow-md p-0 m-0">
        <Sidebar />
      </div>

      <div className="w-4/5 container mx-auto ml-2 mr-6 p-2">
        <img src="/logo1.jpg" alt="Logo" className="h-16 w-20 rounded-lg mx-auto" />
        <h1 className="text-2xl font-semibold text-primary3 text-center mb-6">
          Archive de vos réservations
        </h1>

        {/* Search bar */}
        <div className="flex flex-wrap gap-4">
          <select
            className="border rounded-lg p-2"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <option value="marque">Marque</option>
            <option value="modele">Modèle</option>
            <option value="type">Type</option>
          </select>

          <select
            className="border rounded-lg p-2 flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <option value="">Sélectionnez une valeur</option>
            {Array.from(
              new Set(
                reservations.map((reservation) => reservation[searchCriteria])
              )
            )
              .filter(Boolean)
              .map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
          </select>

          <input
            type="date"
            className="border rounded-lg p-2"
            placeholder="Date de début"
            value={selectedDateRange.startDate}
            onChange={(e) =>
              setSelectedDateRange((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
          <input
            type="date"
            className="border rounded-lg p-2"
            placeholder="Date de fin"
            value={selectedDateRange.endDate}
            onChange={(e) =>
              setSelectedDateRange((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>

        {/* Reservations list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <div key={reservation.reservationId} className="border rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-bold">{reservation.marque}</h2>
                <img
                  src={reservation.pathimage || "default-car.jpg"}
                  alt={reservation.type || "Voiture"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600">Type: {reservation.type}</p>
                <p className="text-gray-600">Modèle: {reservation.modele}</p>
                <p className="text-gray-600">Matricule: {reservation.matricule}</p>
                <p className="text-gray-600">Début: {reservation.dateDb}</p>
                <p className="text-gray-600">Fin: {reservation.dateFin}</p>
                <p className="text-gray-600">
                  Durée: {calculateDateDifference(reservation.dateDb, reservation.dateFin)}
                </p>
                <p className="text-lg font-semibold text-green-500">
                  Prix: {reservation.prix || "N/A"} MAD
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune réservation trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationArchive;
