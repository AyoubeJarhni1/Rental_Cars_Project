import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.jpg" 
            alt="Logo"
            className="h-20 w-20"  // You can adjust the size here
          />
          <a href="#home" className="text-2xl font-bold text-blue-700">
            MyLogo
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-700 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#ride"
              className="text-gray-700 hover:text-blue-700 transition duration-300"
            >
              Ride
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-700 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-700 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#reviews"
              className="text-gray-700 hover:text-blue-700 transition duration-300"
            >
              Reviews
            </a>
          </li>
        </ul>

        {/* Login Button */}
        <div>
          <a
            href="#login"
            className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition duration-300"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
