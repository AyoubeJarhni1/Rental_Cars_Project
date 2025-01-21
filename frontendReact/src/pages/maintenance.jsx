import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarA from "../components/SideBarAdmin";

const Maintenance = () => {
  const [cars, setCars] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedModele, setSelectedModele] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/voitures/allCars");
        const data = response.data.filter(
          (car) =>
            car.status === "DISPONIBLE" || car.status === "EN_REPARATION"
        );
        setCars(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  const handleStatusChange = async () => {
    if (!selectedCar) {
      console.error("Aucune voiture sélectionnée pour changer le statut.");
      return;
    }
  
    const newStatus =
      selectedCar.status === "DISPONIBLE" ? "EN_REPARATION" : "DISPONIBLE";
  
    try {
      console.log(`Tentative de mise à jour du statut de la voiture ID: ${selectedCar.id}`);
      console.log(`Nouveau statut: ${newStatus}`);
  
      // Appel API pour mettre à jour le statut
      await axios.put(
        `http://localhost:8080/voitures/status/${selectedCar.id}`,
        { status: newStatus }
      );
  
      console.log("Statut mis à jour avec succès.");
  
      // Mise à jour locale des données des voitures
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === selectedCar.id ? { ...car, status: newStatus } : car
        )
      );
  
      // Réinitialisation de l'état
      setShowConfirmation(false);
      setSelectedCar(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la voiture:", error.message);
      console.debug("Détails de l'erreur:", error);
    }
  };
  

  const confirmStatusChange = (car) => {
    setSelectedCar(car);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setSelectedCar(null);
  };

  const filteredCars = cars.filter((car) => {
    const modelString = String(car.modele).toLowerCase();
    const typeString = String(car.type).toLowerCase();
    const marqueString = String(car.marque).toLowerCase();

    let isMatch = true;

    if (
      selectedType &&
      !typeString.includes(selectedType.toLowerCase())
    ) {
      isMatch = false;
    }

    if (
      selectedMarque &&
      !marqueString.includes(selectedMarque.toLowerCase())
    ) {
      isMatch = false;
    }

    if (
      selectedModele &&
      !modelString.includes(selectedModele.toLowerCase())
    ) {
      isMatch = false;
    }

    if (
      searchTerm &&
      !car.prix.toString().includes(searchTerm)
    ) {
      isMatch = false;
    }

    return isMatch;
  });

  return (
    <div className="flex min-h-screen bg-primary5">
      <div className="w-1/5 h-auto bg-white shadow-md p-0 m-0">
        <SidebarA />
      </div>

      <div className="w-4/5 container mx-auto ml-2 mr-6 p-2 bg-gradient-to-br from-primary5 to-primary5">
        <h1 className="text-2xl font-semibold text-[#2D90C4] mt-8 text-center mb-6">
          Maintenance des voitures
        </h1>

        {/* Search Filters */}
        <div className="flex flex-col gap-6 mb-6">
          <div className="flex flex-wrap gap-4">
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

            <input
              type="text"
              className="border border-black rounded-lg p-2 flex-1 w-full sm:w-auto"
              placeholder="Rechercher par marque"
              value={selectedMarque}
              onChange={(e) => setSelectedMarque(e.target.value)}
            />

            <input
              type="text"
              className="border border-black rounded-lg p-2 flex-1 w-full sm:w-auto"
              placeholder="Rechercher par modèle"
              value={selectedModele}
              onChange={(e) => setSelectedModele(e.target.value)}
            />

            <input
              type="text"
              className="border border-black rounded-lg p-2 flex-1 w-full sm:w-auto"
              placeholder="Rechercher par prix"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                <button
                  onClick={() => confirmStatusChange(car)}
                  className={`mt-4 p-2 rounded-lg ${
                    car.status === "DISPONIBLE"
                      ? "bg-red-500"
                      : "bg-green-500"
                  } text-white`}
                >
                  {car.status === "DISPONIBLE" ? "Maintenir" : "Disponible"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune voiture trouvée.</p>
          )}
        </div>

        {showConfirmation && selectedCar && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
              <p className="mb-4">
                Êtes-vous sûr de vouloir changer le statut de cette voiture ?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleStatusChange}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Confirmer
                </button>
                <button
                  onClick={closeConfirmation}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
