import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard";
import axios from "axios";

const CarsCrud = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("type");
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [showEditCarForm, setShowEditCarForm] = useState(false);
  const [newCar, setNewCar] = useState({
    marque: "",
    modele: "",
    pathimage: "",
    prix: "",
    status: "",
    type: "",
    user_id: "",
  });
  const [currentCar, setCurrentCar] = useState(null);

  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/voitures/disponibles");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  
  const filteredCars = cars.filter((car) => {
    const modelString = String(car.modele).toLowerCase();

    switch (searchCriteria) {
      case "price":
        return car.prix.toString().includes(searchTerm);
      case "model":
        return modelString.includes(searchTerm.toLowerCase());
      case "type":
        return car.type && car.type.toLowerCase().includes(searchTerm.toLowerCase());
      case "marque":
        return car.marque && car.marque.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return true;
    }
  });

  
  const handleAddCar = async () => {
    try {
      const response = await axios.post("http://localhost:8080/voitures/add", newCar);
      if (response.status === 201) {
        setCars([...cars, response.data]);
        setShowAddCarForm(false);
        setNewCar({
          marque: "",
          modele: "",
          pathimage: "",
          prix: "",
          status: "",
          type: "",
          user_id: "",
        });
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  
  const handleEditCar = (car) => {
    setCurrentCar(car);
    setShowEditCarForm(true);
  };

  // Handle updating a car
  const handleUpdateCar = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/voitures/${currentCar.id}`, currentCar);
      if (response.status === 200) {
        setCars(cars.map((car) => (car.id === currentCar.id ? response.data : car)));
        setShowEditCarForm(false);
        setCurrentCar(null);
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  // Handle deleting a car
  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:8080/voitures/${carId}`);
      setCars(cars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/5 h-screen bg-white shadow-md p-0 m-0">
        <Sidebar />
      </div>

      <div className="w-4/5 container mx-auto ml-2 mr-6 p-2">
        <h1 className="text-2xl font-semibold text-center mb-6">Manage Cars</h1>

        <button
          onClick={() => setShowAddCarForm(true)}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mb-6"
        >
          Add Car
        </button>

        {/* Add New Car Form */}
        {showAddCarForm && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["marque", "modele", "pathimage", "prix", "status", "type", "user_id"].map((field) => (
                <input
                  key={field}
                  type={field === "prix" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newCar[field]}
                  onChange={(e) => setNewCar({ ...newCar, [field]: e.target.value })}
                  className="border rounded-lg p-2"
                />
              ))}
            </div>
            <button
              onClick={handleAddCar}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-4"
            >
              Save Car
            </button>
          </div>
        )}

        {/* Edit Car Form */}
        {showEditCarForm && currentCar && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Edit Car</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["marque", "modele", "pathimage", "prix", "status", "type", "user_id"].map((field) => (
                <input
                  key={field}
                  type={field === "prix" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={currentCar[field]}
                  onChange={(e) => setCurrentCar({ ...currentCar, [field]: e.target.value })}
                  className="border rounded-lg p-2"
                />
              ))}
            </div>
            <button
              onClick={handleUpdateCar}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-4"
            >
              Update Car
            </button>
          </div>
        )}

        {/* Search Filters */}
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
                    onClick={() => handleDeleteCar(car.id)}
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
    </div>
  );
};

export default CarsCrud;
