import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";
import ReservationForm from "./ReservationForm";

const Reservation = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("type");
  const [showForm, setShowForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  
  const [startDate, setStartDate] = useState(""); // Date de début de réservation

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/voitures/disponibles");
        const data = await response.json();
        setCars(data);
        const user = localStorage.getItem("userInfo");
        localStorage.setItem("user", user);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const modelString = String(car.modele).toLowerCase();

    if (searchCriteria === "price") {
      return car.prix.toString().includes(searchTerm);
    }
    if (searchCriteria === "model") {
      return modelString.includes(searchTerm.toLowerCase());
    }
    if (searchCriteria === "type") {
      return car.type && car.type.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchCriteria === "marque") {
      return car.marque && car.marque.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return true;
  }).filter((car) => {

    if (!startDate) return true; // Si aucune date n'est sélectionnée, retournez toutes les voitures
    const carAvailableFromDate = new Date(car.startDate); // Assurez-vous que car.startDate existe et est une date valide
    const filterStartDate = new Date(startDate);
    return carAvailableFromDate <= filterStartDate;
  });

  const handleReservation = (car) => {
    setSelectedCar(car);
    setShowForm(true);
    console.log("Selected Car ID:", car.id);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCar(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/5 h-screen bg-white shadow-md p-0 m-0">
        <Sidebar />
      </div>

      <div className="w-4/5 container mx-auto ml-2 mr-6 p-2">
        <h1 className="text-2xl font-semibold text-center mb-6">Choose your preferred Car</h1>

        {/* Search filters */}
        <div className="flex items-center gap-4 mb-6">
          <select
            className="border rounded-lg border-black p-2"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <option value="marque">Marque</option>
            <option value="type">Type</option>
            <option value="model">Modèle</option>
            <option value="price">Prix</option>
          </select>
          <input
            type="text"
            className="border border-black rounded-lg p-2 flex-1"
            placeholder={`Search by ${searchCriteria}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date filter for start of reservation */}
        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="startDate" className="block text-gray-700 font-medium">
            Date de début de réservation:
          </label>
          <input
            type="date"
            id="startDate"
            className="border border-black rounded-lg p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Cars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="border rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-bold">{car.marque}</h2>
                <img
                  src={car.pathimage}
                  alt={car.type}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600">Type: {car.type}</p>
                <p className="text-gray-600">Modèle: {car.modele}</p>
                <p className="text-lg font-semibold text-green-500">
                  Prix: {car.prix} MAD/jour
                </p>

                <div className="mt-4 space-x-4">
                  <button
                    onClick={() => handleReservation(car)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    Reservate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No car found.</p>
          )}
        </div>
      </div>

      {showForm && selectedCar && (
        <ReservationForm car={selectedCar} onClose={closeForm} />
      )}
    </div>
  );
};

export default Reservation;
