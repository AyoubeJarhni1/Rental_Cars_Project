import React from "react";
import { HomeIcon, ArchiveBoxIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { Navigate, useNavigate } from "react-router-dom";

const Sidebar = () => {

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
    <div className=" fixed  h-screen w-60 bg-blue-500 text-white flex flex-col">
       <img src="/logo1.jpg" alt="Logo" className="h-16 mt-5 w-20 rounded-lg mx-auto" />
      <h1 className="text-2xl font-bold p-4"> Espace Client  </h1>
     <img alt="icone" className="h-20 w-20" src="/logo.png"></img>
      <nav className="flex flex-col gap-4 p-4">
        <a href="/accueil" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <HomeIcon className="h-6 w-6" />
          Accueil
        </a>
        <a href="/archive" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <ArchiveBoxIcon className="h-6 w-6" />
          Archive
        </a>
        <a href="/reservation" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <CalendarIcon className="h-6 w-6" />
          Réservation
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

export default Sidebar;