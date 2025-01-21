import React, { useState, useEffect } from "react";
import { FaCar, FaUserAlt, FaCheckCircle } from "react-icons/fa"; 
import axios from "axios";
import SidebarA from "../components/SideBarAdmin";

const calculateDateDifference = (dateDebut, dateFin) => {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
  
    const diffInMillis = endDate - startDate;
  
    const days = Math.floor(diffInMillis / (1000 * 60 * 60 * 24)); 
    const hours = Math.floor((diffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60)); 
    const seconds = Math.floor((diffInMillis % (1000 * 60)) / 1000); 
  
    return { days, hours, minutes, seconds };
  };


const NewReservationNotification = () => {
  const [notifications, setNotifications] = useState([]);

 
  const fetchReservations = async () => {
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.get("http://localhost:8080/reservation/notifications",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data); 
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations(); 
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex">
        <div className="w-1/3 h-screen bg-white shadow-md p-0 m-0">
        <SidebarA/>
      </div>
      <div className="w-full max-w-2/3 bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4 text-primary3 mt-6">Notifications de Réservations</h2>
    <div className="space-y-4">
      {notifications.map((notification, index) => {
        const diff = calculateDateDifference(notification.dateDb, notification.dateFin); 
     
        console.log("Notification:", notification);
          
        
          console.log("Durée calculée:", diff);

        return (
          <div
            key={index}
            className="flex items-center p-4 bg-blue-500 text-white rounded-lg shadow-md" >
         
            <div>
              <p>
                <span className="font-bold text-primary5">{notification.nameUser}</span> a
                effectué une réservation de voiture :
              </p>
              <p>
                Marque : <span className="font-bold">{notification.marqueVoiture}</span>
              </p>
              <p>
                Matricule :{" "}
                <span className="font-bold">{notification.matriculeVoiture}</span>
              </p>
              <p className="text-sm text-blue">
                Pour une durée de {diff.days} jours.
              </p>
              <p className="text-sm text-gray-200">{notification.date}</p>
            </div>
            
            <div className="text-right flex flex-col items-end">
                  <p className="text-sm font-bold text-white mb-2">
                    {new Date(notification.dateGeneration).toLocaleDateString()}
                  </p>
                  <span className="text-xs bg-gray-200 text-black px-2 py-1 rounded-full items-end">
                    {new Date(notification.dateGeneration).toLocaleTimeString()}
                  </span>
                </div>
          </div>
        );
      })}
    </div>
  </div>
  </div>
);
};

export default NewReservationNotification;