import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data; 
      console.log("Token JWT:", token);

      const decodedToken = jwtDecode(token);

      localStorage.setItem("token", token);
    localStorage.setItem("userEmail", data.email);

      const role = decodedToken.roles[0]?.authority; 
      alert("bienvenu");

      if (role === "ROLE_ADMIN") {
        navigate("/rent");
      } else if (role === "ROLE_USER") {
        navigate("/client");
      } else {
        alert("Rôle non reconnu");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-[#0977BE] mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("email", { required: "L'email est requis." })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("password", { required: "Le mot de passe est requis." })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-[#0977BE] text-white rounded-lg">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Login;
