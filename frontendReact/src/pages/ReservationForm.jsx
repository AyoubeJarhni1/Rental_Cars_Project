import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate,useNavigate } from "react-router-dom";


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

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [reservationId, setReservationId] = useState(null);

  const navigate = useNavigate();

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


  const calculateTotalPrice = () => {
    const beginDate = new Date(userInfo.beginDate);
    const endDate = new Date(userInfo.endDate);
  
    const durationInMs = endDate - beginDate;
   
    const durationInDays = durationInMs / (1000 * 3600 * 24); 
   
    const pricePerDay = localStorage.getItem("priceCar"); 
    
    const totalPrice = durationInDays * pricePerDay;
    
    return totalPrice;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const beginDate = new Date(userInfo.beginDate);
  const endDate = new Date(userInfo.endDate);
  const currentDate = new Date();

  
  if (beginDate < currentDate) {
    alert("La date de début ne peut pas être dans le passé.");
    return;
  }

  if (endDate < currentDate) {
    alert("La date de fin ne peut pas être dans le passé.");
    return;
  }

  if (beginDate >= endDate) {
    alert("La date de fin doit être après la date de début.");
    return;
  }


    
    const confirmation = window.confirm("Êtes-vous sûr de vouloir effectuer cette réservation ?");
    
    if (!confirmation) {
      alert("Réservation annulée.");
      return; 
    }
  
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
        "http://localhost:8080/reservation/good",
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
      alert("Impossible d'effectuer la réservation. Voiture déjà réservée.");
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const id=localStorage.getItem("reservationId");
  
    if (!token) {
      alert("Vous devez être connecté pour effectuer cette action.");
      return;
    }
  
    const confirmation = window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?");
    if (!confirmation) return;
  
    try {
      await axios.delete(`http://localhost:8080/reservation/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Réservation annulée avec succès.");
      setReservationId(null); 
      setShowConfirmation(false); 
      localStorage.removeItem("reservationId"); 

    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation :", error);
      alert("Impossible d'annuler la réservation. Veuillez réessayer.");
    }
  };


  const handlePayer = () => {
    const totalPrice = calculateTotalPrice();
  
    console.log("Date de début (dateDb):", userInfo.beginDate);
    console.log("Date de fin (dateFin):", userInfo.endDate);
    console.log("prix par",localStorage.getItem("priceCar"));
    console.log("Prix total de la location:", totalPrice);
    
    if (!totalPrice || totalPrice <= 0) {
      alert("Le prix total est invalide. Veuillez vérifier votre réservation.");
      return;
    }
    navigate("/payer", { 
      state: { 
        reservationId, 
        car, 
        totalPrice 
      } 
    });
  };
  
  
  


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50  ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Réserver la voiture: {car.marque} {car.modele} de matricule {car.matricule}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label htmlFor="EMAIL" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="text"
              id="EMAIL"
              name="EMAIL"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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

        {reservationId && !showConfirmation && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Générer le Contrat
            </button>
          </div>
        )}




{showConfirmation && (
          <div className="mt-4">
            <p className="text-gray-800 mb-2">Êtes-vous sûr de vouloir générer le contrat ?</p>
            <div className="flex justify-between">
              <button
                onClick={handleGenerateContract}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Confirmer
              </button>
              <button
                onClick={() => handleDelete()}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

{reservationId && (
  <div className="mt-4">
    <button
      type="button"
      onClick={handlePayer} 
      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      Procéder au paiement
    </button>
  </div>
)}

 
      </div>
    </div>
  );
};

export default ReservationForm;