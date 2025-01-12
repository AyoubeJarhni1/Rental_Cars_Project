import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";
import ReservationForm from "./ReservationForm";

const Reservation = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedModele, setSelectedModele] = useState("");
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");   
  const [showForm, setShowForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/voitures/disponibles");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Veuillez choisir les dates de début et de fin.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/voitures/disponiblesDate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching filtered car data:", error);
    }
  };

  const uniqueValues = (key) => [...new Set(cars.map((car) => car[key]))];

  const marques = uniqueValues("marque");
  const types = uniqueValues("type");
  const modeles = uniqueValues("modele");

  const filteredCars = cars.filter((car) => {
    const isTypeMatch = selectedType === "" || car.type.toLowerCase().includes(selectedType.toLowerCase());
    const isMarqueMatch = selectedMarque === "" || car.marque.toLowerCase().includes(selectedMarque.toLowerCase());
    const isModeleMatch = selectedModele === "" || car.modele.toString().toLowerCase().includes(selectedModele.toLowerCase());
    const isPriceMatch = searchTerm === "" || car.prix.toString().includes(searchTerm);

    return isTypeMatch && isMarqueMatch && isModeleMatch && isPriceMatch;
  });

  const handleReservation = (car) => {
    setSelectedCar(car);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCar(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/5 h-auto bg-white shadow-md p-0 m-0">
        <Sidebar />
      </div>

      <div className="w-4/5 container mx-auto ml-2 mr-6 p-2 bg-gradient-to-br from-primary5 to-primary5">
        <img src="/logo1.jpg" alt="Logo" className="h-16 w-20 rounded-lg mx-auto" />
        <h1 className="text-2xl font-semibold text-[#2D90C4] mt-8 text-center mb-6">
          Réserver votre voiture préférée
        </h1>

        <div className="flex flex-col gap-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <select
              className="border rounded-lg border-black p-2 w-full sm:w-auto"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Sélectionner le type</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              className="border rounded-lg border-black p-2 w-full sm:w-auto"
              value={selectedMarque}
              onChange={(e) => setSelectedMarque(e.target.value)}
            >
              <option value="">Sélectionner la marque</option>
              {marques.map((marque, index) => (
                <option key={index} value={marque}>
                  {marque}
                </option>
              ))}
            </select>

            <select
              className="border rounded-lg border-black p-2 w-full sm:w-auto"
              value={selectedModele}
              onChange={(e) => setSelectedModele(e.target.value)}
            >
              <option value="">Sélectionner le modèle</option>
              {modeles.map((modele, index) => (
                <option key={index} value={modele}>
                  {modele}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="border border-black rounded-lg p-2 flex-1 w-full sm:w-auto"
              placeholder="Rechercher par prix"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <input
              type="date"
              className="border border-black rounded-lg p-2 w-full sm:w-auto"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="border border-black rounded-lg p-2 w-full sm:w-auto"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full sm:w-20 h-10 border border-black py-2 bg-[#0977BE] text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
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
                    Réserver
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
