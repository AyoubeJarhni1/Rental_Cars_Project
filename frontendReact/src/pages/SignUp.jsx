import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    console.log(data); 

    const requestData = {
      name: data.name,
      password: data.password,
      email: data.email,
      address: data.address,
      dateNaiss: data.dateNaiss,
      nTele: data.nTele,
      role: data.role, 
    };

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", requestData);
      console.log("Réponse du serveur:", response.data); 
      alert("Inscription réussie!");
      
    
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error); 
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
       <img
        src="/logo1.jpg"
        alt="Logo"
        className="h-16 w-20 rounded-lg mx-auto"
      />
      <h2 className="text-3xl font-bold text-center text-[#0977BE] mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("name", { required: "Username is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("dateNaiss", { required: "Date of Birth is required" })}
          />
          {errors.dateNaiss && <p className="text-red-500 text-sm">{errors.dateNaiss.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("nTele", { required: "Phone number is required" })}
          />
          {errors.nTele && <p className="text-red-500 text-sm">{errors.nTele.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("confirmPassword", {
              validate: value => value === watch("password") || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register("role", { required: "Role is required" })}
          >
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_USER">ROLE_USER</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        <button type="submit" className="w-full py-2 mb-4 bg-[#0977BE] text-white rounded-lg">Sign Up</button>
        <a href='/login' className='mt-5 text-[#0977BE]' >Sign in now </a>
      </form>
    </div>
  );
};

export default SignUp;
