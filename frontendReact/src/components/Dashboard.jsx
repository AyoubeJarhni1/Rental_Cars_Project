import React from "react";
import { HomeIcon, ArchiveBoxIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-blue-500 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4">Client Space </h1>
      <nav className="flex flex-col gap-4 p-4">
        <a href="/" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
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
        <a href="/logout" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
          <UserIcon className="h-6 w-6" />
          logout
         
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;