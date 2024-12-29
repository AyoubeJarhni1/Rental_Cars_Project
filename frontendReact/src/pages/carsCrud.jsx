import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";
import ConfirmationModal from "../components/ConfirmationModal";
import axios from "axios";
import SidebarA from "../components/SideBarAdmin";

const CarsCrud = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("prix");
  const [showAddCarPage, setShowAddCarPage] = useState(false);
  const [showEditCarPage, setShowEditCarPage] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [newCar, setNewCar] = useState({
    marque: "",
    modele: "",
    pathimage: "",
    prix: "",
    status: "DISPONIBLE",
    type: "essence",
     matricule:""
  });
  const [currentCar, setCurrentCar] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedModele, setSelectedModele] = useState("");

  const handleAddCarClick = () => {
    setShowAddCarPage(true);
  };

  const handleCloseAddCarPage = () => {
    setShowAddCarPage(false);
  };

  const handleCloseEditCarPage = () => {
    setShowEditCarPage(false);
    setCurrentCar(null);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setCarToDelete(null);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/voitures/allCars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

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

  const handleAddCar = async () => {
    try {
      const response = await axios.post("http://localhost:8080/voitures/add", newCar);
      if (response.status === 201) {
        setCars([...cars, response.data]);
        setShowAddCarPage(false);
        setNewCar({
          marque: "",
          modele: "",
          pathimage: "",
          prix: "",
          status: "DISPONIBLE",
          type: "essence",
          matricule:""
        });
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleEditCar = (car) => {
    setCurrentCar(car);
    setShowEditCarPage(true);
  };

  const handleUpdateCar = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/voitures/${currentCar.id}`, currentCar);
      if (response.status === 200) {
        setCars(cars.map((car) => (car.id === currentCar.id ? response.data : car)));
        alert("voiture mise à jour avec succés");
        setShowEditCarPage(false);
        setCurrentCar(null);
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      await axios.delete(`http://localhost:8080/voitures/${carToDelete}`);
      setCars(cars.filter((car) => car.id !== carToDelete));
      handleCloseConfirmationModal();
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("vous pouvez pas supprimé cette voiture,réservée");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const filePath = file.name; 
      console.log("Nom du fichier:", filePath);
  
      
      setNewCar((prevState) => ({
        ...prevState,
        pathimage: filePath, 
      }));
    }
  };
  

  const confirmDeleteCar = (carId) => {
    setCarToDelete(carId);
    setShowConfirmationModal(true);
  };



  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/5 h-screen bg-white shadow-md p-0 m-0">
        <SidebarA/>
      </div>

      <div className="w-4/5 container mx-auto ml-2 mr-6 p-2">
        <h1 className="text-2xl font-semibold text-center mb-6">Manage Cars</h1>

        <button
          onClick={handleAddCarClick}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mb-6"
        >
          Add Car
        </button>

        {showAddCarPage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Car</h2>
              {/* Add Car Form */}
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marque">
                    Marque
                  </label>
                  <input
                    type="text"
                    id="marque"
                    value={newCar.marque}
                    onChange={(e) => setNewCar({ ...newCar, marque: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modele">
                    Modèle
                  </label>
                  <input
                    type="text"
                    id="modele"
                    value={newCar.modele}
                    onChange={(e) => setNewCar({ ...newCar, modele: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="matricule">
                    Matricule
                  </label>
                  <input
                    type="text"
                    id="matricule"
                    value={newCar.matricule}
                    onChange={(e) => setNewCar({ ...newCar, matricule: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pathimage">
                    Image
                  </label>
                  <input
                    type="file"
                    id="pathimage"
                    onChange={handleImageChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prix">
                    Prix
                  </label>
                  <input
                    type="number"
                    id="prix"
                    value={newCar.prix}
                    onChange={(e) => setNewCar({ ...newCar, prix: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    value={newCar.status}
                    onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="DISPONIBLE">DISPONIBLE</option>
                    <option value="RESERVEE">RESERVEE</option>
                    <option value="EN_REPARATION">EN_REPARATION</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Type
                  </label>
                  <select
                    id="type"
                    value={newCar.type}
                    onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="essence">Essence</option>
                    <option value="gazoil">Diesel</option>
                  </select>
                </div>
                <div className="flex justify-around">
                  <button
                    type="button"
                    onClick={handleAddCar}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseAddCarPage}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Car Page */}
        {showEditCarPage && currentCar && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Car</h2>
              {/* Edit Car Form */}
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marque">
                    Marque
                  </label>
                  <input
                    type="text"
                    id="marque"
                    value={currentCar.marque}
                    onChange={(e) => setCurrentCar({ ...currentCar, marque: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modele">
                    Modèle
                  </label>
                  <input
                    type="text"
                    id="modele"
                    value={currentCar.modele}
                    onChange={(e) => setCurrentCar({ ...currentCar, modele: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pathimage">
                    Image
                  </label>
                  <input
                    type="file"
                    id="pathimage"
                    onChange={handleImageChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prix">
                    Prix
                  </label>
                  <input
                    type="number"
                    id="prix"
                    value={currentCar.prix}
                    onChange={(e) => setCurrentCar({ ...currentCar, prix: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    value={currentCar.status}
                    onChange={(e) => setCurrentCar({ ...currentCar, status: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="DISPONIBLE">DISPONIBLE</option>
                    <option value="RESERVEE">RESERVEE</option>
                    <option value="EN_REPARATION">EN_REPARATION</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Type
                  </label>
                  <select
                    id="type"
                    value={currentCar.type}
                    onChange={(e) => setCurrentCar({ ...currentCar, type: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="essence">Essence</option>
                    <option value="gazoil">Gazoil</option>
                  </select>
                </div>
                <div className="flex justify-around">
                  <button
                    type="button"
                    onClick={handleUpdateCar}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseEditCarPage}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

        {/* Cars Listing */}
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
                <p className="text-gray-600">Status: {car.status}</p>
                <p className="text-lg font-semibold text-green-500">
                  Prix: {car.prix} MAD/jour
                </p>

                <div className="mt-4 space-x-4">
                  <button
                    onClick={() => handleEditCar(car)}
                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => confirmDeleteCar(car.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No cars found</p>
          )}
        </div>
      </div>

      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this car?"
          onConfirm={handleDeleteCar}
          onCancel={handleCloseConfirmationModal}
        />
      )}
    </div>
  );
};

export default CarsCrud;