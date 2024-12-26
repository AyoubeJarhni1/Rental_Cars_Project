import React from "react";
import { HomeIcon, CarIcon, CalendarIcon, UserIcon, LogoutIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; 

const SidebarA = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    
    if (confirmation) {
      localStorage.removeItem('token'); 
      alert("Vous êtes déconnecté");
      navigate("/"); 
    }
  };

  return (
    <div className="h-screen w-60 bg-blue-500 text-white flex flex-col">
      <img src="/logo1.jpg" alt="Logo" className="h-16 mt-5 w-20 rounded-lg mx-auto" />
      <h1 className="text-2xl font-bold p-4">Admin Space</h1>
      <nav className="flex flex-col gap-4 p-4">
        <a href="/" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <HomeIcon className="h-6 w-6" />
          Accueil
        </a>
        <a href="/carscrud" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <CalendarIcon className="h-6 w-6" />
          Cars
        </a>
        <a href="/Dashborad_admin" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <CalendarIcon className="h-6 w-6" />
          Dashboard
        </a>
        <a href="/profil" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <UserIcon className="h-6 w-6" />
          Profil
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
        >
          <UserIcon className="h-6 w-6" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default SidebarA;
