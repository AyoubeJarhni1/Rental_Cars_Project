import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg mb-8  h-21 fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-between py-3 px-6">
        
      
      <div className="flex items-center space-x-0">
  <img
    src="/logo1.jpg"
    alt="Logo"
    className="h-16 w-20 rounded-full"
  />
  <a
    href="#"
    className="text-2xl font-semibold "
    style={{
      color: "#1C78AA",
      fontFamily: "'Arial', sans-serif", 
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", 
      letterSpacing: "0.5px"
    }}
  >
    RideFlex
  </a>
</div>


        <ul className="flex space-x-10 flex-grow justify-center">
          <li>
            <a
              href="#home"
              className="text-gray-700 font-semibold hover:text-[#637BE4] transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#ride"
              className="text-gray-700 font-semibold hover:text-[#637BE4] transition duration-300"
            >
              Ride
            </a>
          </li>
          <li>
            <a
              href="#home-carousel"
              className="text-gray-700 font-semibold hover:text-[#637BE4] transition duration-300"
            >
             Our Cars
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-gray-700 font-semibold hover:text-[#637BE4] transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-700 font-semibold hover:text-[#637BE4] transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#reviews"
              className="text-gray-700 hover:text-[#637BE4] transition duration-300"
            >
              Reviews
            </a>
          </li>
        </ul>

        {/* Boutons Login et Signup alignés à droite */}
        <div className="flex items-center space-x-6 ml-auto">
          <a
            href="/login"
            className="text-white bg-[#0977BE] hover:bg-[#637BE4] px-6 py-2 rounded-xl transition duration-300"
          >
            Login
          </a>
          <a
            href="/signup"
            className="text-white bg-[#0977BE] hover:bg-[#637BE4] px-6 py-2  rounded-xl transition duration-300"
          >
            Sign Up
          </a>
        </div>
        
      </div>
    </nav>
  );
};

export default NavBar;
