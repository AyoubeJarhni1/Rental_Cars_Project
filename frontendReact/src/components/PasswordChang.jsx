import React, { useState } from "react";
import axios from "axios";
import { FaSave, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Remplacez 'next/router' par 'react-router-dom'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); 

 
  const redirectToProfile = () => {
    navigate("/profil"); 
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    try {
      const response = await axios.put(
        `http://localhost:8080/api/update/password/${email}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Mot de passe changé avec succès.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setError("Erreur lors du changement du mot de passe.");
      console.error(error);
    }

  };

  const togglePasswordVisibility = (field) => {
    if (field === "old") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Changer le Mot de Passe
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <div className="mb-4">
          <label className="font-medium text-gray-700">Ancien Mot de Passe</label>
          <div className="flex items-center">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("old")}
              className="ml-2 text-gray-600"
            >
              {showOldPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-medium text-gray-700">Nouveau Mot de Passe</label>
          <div className="flex items-center">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="ml-2 text-gray-600"
            >
              {showNewPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="font-medium text-gray-700">Confirmer le Nouveau Mot de Passe</label>
          <div className="flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="ml-2 text-gray-600"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center"
          >
            <FaSave className="mr-2" />
            Sauvegarder
          </button>
          <button
            onClick={redirectToProfile} 
            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={redirectToProfile} 
            
            className="bg-red-500 text-white px-6 py-2 rounded-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
