import React, { useState } from "react";

function CarCarousel() {
  const slides = [
    {
      title: "Tesla Model S",
      description:
        "Découvrez la Tesla Model S, une voiture électrique révolutionnaire alliant puissance, autonomie et technologie de pointe.",
      image: "/daci.jpg",
    },
    {
      title: "BMW Série 5",
      description:
        "La BMW Série 5 offre un mélange parfait de luxe, de performances et de design raffiné.",
      image: "/ford.jpg",
    },
    {
      title: "Audi Q7",
      description:
        "L'Audi Q7 est un SUV spacieux avec un intérieur premium et des fonctionnalités avancées pour une expérience de conduite incomparable.",
      image: "/clio.jpg",
    },
    {
      title: "Ford Mustang GT",
      description:
        "La Ford Mustang GT incarne la puissance et le style emblématique des voitures sportives américaines.",
      image: "/ford_mustang_gt.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <button
          className="p-2 ml-8 text-white bg-gray-800 rounded-full hover:bg-gray-700"
          onClick={prevSlide}
        >
          &lt;
        </button>

        <div className="flex-1 p-4 text-center flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 p-4 ml-8">
            <h2 className="text-4xl font-extrabold mb-2 text-white">
              {slides[currentIndex].title}
            </h2>
            <p className="text-gray-300 mb-4">
              {slides[currentIndex].description}
            </p>
            <a
              href="/details"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              En savoir plus
            </a>
          </div>
          <div className="w-full md:w-1/2 p-4 mr-8">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <button
          className="p-2 mr-8 text-white bg-gray-800 rounded-full hover:bg-gray-700"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default CarCarousel;
