import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";
import SidebarA from "../components/SideBarAdmin";

const CarsAdmin = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("prix");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedModele, setSelectedModele] = useState("");
  const [startDate, setStartDate] = useState("");  
  const [endDate, setEndDate] = useState("");      

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
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });

      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching filtered car data:", error);
    }
  };

  const filteredCars = cars.filter((car) => {
    const modelString = String(car.modele).toLowerCase();
    const typeString = String(car.type).toLowerCase();
    const marqueString = String(car.marque).toLowerCase();

    let isMatch = true;

    // Filtrage par type
    if (selectedType && selectedType !== "" && !typeString.includes(selectedType.toLowerCase())) {
      isMatch = false;
    }

    // Filtrage par marque
    if (selectedMarque && selectedMarque !== "" && !marqueString.includes(selectedMarque.toLowerCase())) {
      isMatch = false;
    }

    // Filtrage par modèle
    if (selectedModele && selectedModele !== "" && !modelString.includes(selectedModele.toLowerCase())) {
      isMatch = false;
    }

    // Filtrage par prix
    if (searchCriteria === "prix" && searchTerm && !car.prix.toString().includes(searchTerm)) {
      isMatch = false;
    }

    return isMatch;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/5 h-screen bg-white shadow-md p-0 m-0">
        <SidebarA/>
      </div>

      <div className="w-4/5 container mx-auto ml-2 mr-6 p-2">
        <h1 className="text-2xl font-semibold text-blue-500 mt-8 text-center mb-6">Manage Available Cars</h1>

        <div className="flex flex-col gap-6 mb-6">
          {/* Section for selecting type, brand, model, and price */}
          <div className="flex flex-wrap gap-4">
            {/* Sélection Type */}
            <select
              className="border rounded-lg border-black p-2 w-full sm:w-auto"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Sélectionner le type</option>
              <option value="essence">essence</option>
              <option value="diesel">diesel</option>
              <option value="hybride">hybride</option>
              <option value="électrique">électrique</option>
            </select>

            {/* Sélection Marque */}
            <select
              className="border rounded-lg border-black p-2 w-full sm:w-auto"
              value={selectedMarque}
              onChange={(e) => setSelectedMarque(e.target.value)}
            >
              <option value="">Sélectionner la marque</option>
              <option value="Toyota">Toyota</option>
              <option value="Renault">Renault</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Peugeot">Peugeot</option>
            </select>

            {/* Sélection Modèle */}
            <select
              className="border rounded-lg border-black p-2 w-full sm:w-auto"
              value={selectedModele}
              onChange={(e) => setSelectedModele(e.target.value)}
            >
              <option value="">Sélectionner le modèle</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>

            {/* Rechercher par prix */}
            <input
              type="text"
              className="border border-black rounded-lg p-2 flex-1 w-full sm:w-auto"
              placeholder="Rechercher par prix"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Section for date selection */}
          <div className="flex flex-wrap gap-4">
            {/* Sélection Date de début */}
            <input
              type="date"
              className="border border-black rounded-lg p-2 w-full sm:w-auto"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            {/* Sélection Date de fin */}
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
              </div>
            ))
          ) : (
            <p className="text-gray-600">No car found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsAdmin;
