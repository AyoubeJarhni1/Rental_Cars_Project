import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import NavBar from "../components/NavBar";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedModele, setSelectedModele] = useState("");
  const [startDate, setStartDate] = useState("");
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

  const uniqueValues = (key) => [...new Set(cars.map((car) => car[key]))];

  const types = uniqueValues("type");
  const marques = uniqueValues("marque");
  const modeles = uniqueValues("modele");

  const filteredCars = cars.filter((car) => {
    const isTypeMatch = !selectedType || car.type === selectedType;
    const isMarqueMatch = !selectedMarque || car.marque === selectedMarque;
    const isModeleMatch = !selectedModele || car.modele === selectedModele;

    return isTypeMatch && isMarqueMatch && isModeleMatch;
  });

  const handleReservation = (car) => {
        
    alert("You must authenticate to make a reservation.");
    window.location.href = "/login"; 
    return;


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
      <div className="container mx-auto p-4">
        <div className="mb-20">  <NavBar/> </div>
     
        <h1 className="text-2xl font-bold text-primary3 mb-6 mt-15 text-center">
          Chercher votre voiture préférable
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="border rounded-lg p-2"
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
            className="border rounded-lg p-2"
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
            className="border rounded-lg p-2"
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
        </div>

        <div className="mb-6">
          <label htmlFor="startDate" className="block font-medium mb-2">
            Date de début de réservation:
          </label>
          <input
            type="datetime-local"
            id="startDate"
            className="border rounded-lg p-2 w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

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
                <p>Type: {car.type}</p>
                <p>Modèle: {car.modele}</p>
                <p className="font-semibold text-green-600">
                  Prix: {car.prix} MAD/jour
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                  onClick={() => handleReservation(car)}
                >
                  Réserver
                </button>
              </div>
            ))
          ) : (
            <p>Aucune voiture disponible.</p>
          )}
        </div>
      </div>

      {showForm && selectedCar && (
        <ReservationForm car={selectedCar} onClose={closeForm} />
      )}
    </div>
  );
};

export default CarsPage;
