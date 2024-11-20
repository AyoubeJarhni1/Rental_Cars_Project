import React from "react";

const AboutUs = () => {
  return (
    <section className="about py-16 mt-2 bg-[#EDEEF6]" id="about">
      <div className="heading text-center mb-12">
        <span className="text-[#0977BE] text-lg font-semibold">About Us</span>
        <h1 className="text-3xl font-bold text-[#0977BE] mt-2">
          Best Customer Experience
        </h1>
      </div>
      <div className="about-container flex flex-col lg:flex-row justify-center gap-8 items-center">
        <div className="about-img w-full lg:w-1/2 mb-8 ml-8 lg:mb-0">
          <img src="/agence.jpg" alt="About CasaRide" className="h-1/2 rounded-lg shadow-lg"/>
        </div>
        <div className="about-text text-center mr-8 lg:text-left w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-[#0977BE] mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            CasaRide was born in 2024 out of the passion and enthusiasm of a group of young Moroccan entrepreneurs.
          </p>
          <p className="text-gray-600 mb-4">
            Seeing a growing need for reliable and flexible car rental services in Morocco, we decided to create a platform that would make renting vehicles simple, accessible, and tailored to the needs of our customers.
          </p>
          <p className="text-gray-600 mb-4">
            From city cars to luxury vehicles, we offer a wide range of options to suit every need, ensuring that every journey begins with a smart choice. At CasaRide, we are committed to providing an unmatched customer experience with every rental.
          </p>
         
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
