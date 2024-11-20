import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-[#0977BE] mt-4 p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/foot1.jpeg" alt="Logo" width={100} height={80} />
          <div className="ml-2">
            <span className="text-2xl font-bold text-white">RentCars</span>
            <p className="text-gray-200 mt-2">Your trusted car rental service for every journey.</p>
          </div>
        </div>

      </div>

      {/* Information and Services Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 text-white">
        <div>
          <h4 className="font-bold mb-2">Information</h4>
          <ul>
            <li><a href="#faq" className="hover:text-[#65ceb9]">FAQ</a></li>
            <li><a href="#terms" className="hover:text-[#65ceb9]">Terms and Conditions</a></li>
            <li><a href="#privacy" className="hover:text-[#65ceb9]">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Our Services</h4>
          <ul>
            <li><a href="#short-term" className="hover:text-[#65ceb9]">Short-Term Rental</a></li>
            <li><a href="#long-term" className="hover:text-[#65ceb9]">Long-Term Rental</a></li>
            <li><a href="#insurance" className="hover:text-[#65ceb9]">Insurance</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contact Us</h4>
          <ul>
            <li><span className="text-white">Email: contact@autoloc.com</span></li>
            <li><span className="text-white">Phone: +33 1 23 45 67 89</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65ceb9]"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65ceb9]"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65ceb9]"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#65ceb9]"
            >
              <FaYoutube size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright information */}
      <div className="text-center text-white text-sm">
        <p>© 2024 RentCars - All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
