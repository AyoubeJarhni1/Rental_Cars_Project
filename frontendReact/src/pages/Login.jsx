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
        navigate("/carsAdmin");
      } else if (role === "ROLE_USER") {
        navigate("/accueil");
      } else {
        alert("Rôle non reconnu");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-auto mt-10 p-8 bg-white shadow-lg rounded-lg flex items-center">
      
      <div className="w-1/3 flex border-full justify-center">
        <video
          src="/video.mp4" 
          className="h-64 w-auto rounded-lg"
          autoPlay
          loop
          muted
        />
      </div>

      <div className="w-2/3 p-4">
        <img src="/logo1.jpg" alt="Logo" className="h-16 w-20 rounded-lg mx-auto" />
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
          <br /> <br />
          <h3>
            Do you have an account? <a href="/signup" className="text-[#0977BE] mt-5">Create account</a>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
