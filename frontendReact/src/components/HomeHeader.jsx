import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function RentalCars() {
  const [color, setColor] = useState("#0977BE");
  const navigate = useNavigate(); 

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(color === "BLUE" ? "#FF6347" : "BLUE"); 
    }, 5000);

    return () => clearInterval(interval);
  }, [color]);

 
  const navigateToCars = () => {
    navigate('/cars'); 
  };

  return (
    <div className="flex flex-col md:flex-row items-center mt-12 mb-6 text-center bg-[#F9F9F9] py-16" id="home">
      <div className="flex-1 px-6 md:px-12">
        <h1 className="text-4xl font-bold mb-6 animate-move-title" style={{ color }}>
          Premium Rental Cars
        </h1>
        <p className="text-xl font-semibold text-[#333] mb-8">
          Your journey starts here – rent with confidence, drive in style.
        </p>
      
        <button
          onClick={navigateToCars}
          className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          View Cars
        </button>
      </div>

      
      <div className="flex-1">
        <img
          src="/HERO.png"
          alt="Premium Rental Cars"
          className="w-full max-w-[600px] h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default RentalCars;
