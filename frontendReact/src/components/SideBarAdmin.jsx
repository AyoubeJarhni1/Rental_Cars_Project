import React, { useState, useEffect } from "react";
import { HomeIcon, CarIcon, CalendarIcon, UserIcon, LogoutIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCar,FaWrench ,FaSignOutAlt, FaTachometerAlt} from 'react-icons/fa'; 
import axios from "axios";

const SidebarA = () => {
  const navigate = useNavigate(); 
  const [newReservations, setNewReservations] = useState(0);
  const token = localStorage.getItem("token");

  const fetchNewReservations = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/reservation/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewReservations(response.data.length);
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications :", error);
    }
  };

  useEffect(() => {
    fetchNewReservations();
    const interval = setInterval(fetchNewReservations, 60); 
    return () => clearInterval(interval); 
  }, []);

  const handleLogout = () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    
    if (confirmation) {
      localStorage.removeItem('token'); 
      localStorage.removeItem('userInfo');
      alert("Vous êtes déconnecté");
      navigate("/"); 
    }
  };

  return (
    <div className="h-screen w-60 bg-blue-500 text-white flex flex-col fixed">
      <img src="/logo1.jpg" alt="Logo" className="h-16 mt-5 w-20 rounded-lg mx-auto" />
      <h1 className="text-2xl font-bold p-4">Admin Space</h1>
      <nav className="flex flex-col gap-4 p-4">
        <a href="/notifier" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <HomeIcon className="h-6 w-6" />
          Accueil
          {newReservations > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              +{newReservations}
            </span>
          )}
        </a>
        <a href="/carsAdmin" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
        <FaCar className="h-6 w-6 inline-block mr-2" />
          Cars
        </a>
        <a href="/maintenance" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <FaWrench className="h-6 w-6" />
          maintenance
        </a>
        <a href="/Dashborad_admin" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <FaTachometerAlt className="h-6 w-6" />
          Dashboard
        </a>
        <a href="/profilAdmin" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <UserIcon className="h-6 w-6" />
          Profil
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
        >
          <FaSignOutAlt className="h-6 w-6" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default SidebarA;
