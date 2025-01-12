import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import Sidebar from "../components/Dashboard";
import { useNavigate } from 'react-router-dom'; 
import SidebarA from "../components/SideBarAdmin";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ProfileAdmin = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    adress: "",
    dateNaiss: "",
    ntele: "",
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");

    if (storedEmail && token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/client/get/${storedEmail}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Response from backend:", response.data);

          const { id, ntele } = response.data;

          console.log("ID récupéré: ", id);
          localStorage.setItem("idUser", id);

          setUserInfo({
            name: response.data.name,
            email: response.data.email,
            adress: response.data.adress,
            dateNaiss: response.data.dateNaiss,
            ntele: ntele,
          });

          localStorage.setItem("userInfo", JSON.stringify(response.data));
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur", error);
        }
      };

      fetchUserData();
    } else {
      alert("Utilisateur non authentifié. Veuillez vous connecter.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Champ modifié: ${name}, Nouvelle valeur: ${value}`);

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    console.log("Données avant l'envoi:", userInfo);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/client/update/${userInfo.email}`,
        {
          name: userInfo.name,
          email: userInfo.email,
          adress: userInfo.adress,
          dateNaiss: userInfo.dateNaiss,
          ntele: userInfo.ntele,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Réponse du backend:", response);

      if (response.status === 200) {
        alert("Profil mis à jour avec succès!");
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("Profil mis à jour avec succès!");
      } else {
        alert("Erreur lors de la mise à jour.");
        console.log("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  const handleChangePassword = () => {
    navigate('/password'); 
  };

  return (
    <div className="min-h-screen bg-blue-50 flex">

<div className="   w-1/5 h-auto bg-white shadow-md p-0 m-0">
        <SidebarA/>
      </div>
      
      <div className="flex-1 p-6">
        <div className="w-full max-w-2/3 bg-white shadow-lg rounded-lg p-6">
        <img src="/logo1.jpg" alt="Logo" className="h-16 w-20 rounded-lg mx-auto" />
          <h1 className="text-2xl  font-bold  mb-6 text-center text-primary4">Your Profil </h1>

          {Object.keys(userInfo).map((key, index) =>
            key !== "role" && key !== "password" && (
              <div key={index} className="flex items-center justify-between mb-4">
                <label className="font-medium text-gray-700 capitalize w-1/3">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <div className="flex items-center w-full">
                  {key === "dateNaiss" ? (
                    <div className="flex items-center w-full">
                      <input
                        type="date"
                        name={key}
                        value={formatDate(userInfo[key])}
                        onChange={handleChange}
                        className="flex-1 border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        onClick={handleSave}
                        className="ml-2 text-gray-600"
                      >
                        <FaSave className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        name={key}
                        value={userInfo[key]}
                        onChange={handleChange}
                        className="flex-1 border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        onClick={handleSave}
                        className="ml-2 text-gray-600"
                      >
                        <FaSave className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          <div className="mt-4">
            <button
              onClick={handleChangePassword}
              className="w-1/3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              modifier le mot de passe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
