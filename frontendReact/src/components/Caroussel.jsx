import React, { useState } from "react";

function CarCarousel() {
  const slides = [
    {
      title: "Dacia",
      description:
        "Dacia is known for its affordable and reliable cars, perfect for those seeking great value for money.",
      image: "/dacia.png", 
    },
    {
      title: "Renault Clio",
      description:
        "The Renault Clio offers a modern design, balanced performance, and advanced technology.",
      image: "/clio.jpg", 
    },
    {
      title: "Renault Mégane",
      description:
        "The Renault Mégane combines comfort, technology, and performance, making it perfect for families or sports enthusiasts.",
      image: "/megane1.png", 
    },
    {
      title: "KIA",
      description:
        "KIA offers modern and innovative vehicles with a long warranty and excellent value for money.",
      image: "/kia.jpg", 
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
    
      
    <div id="home-carousel" className=" home relative w-full mb-3  max-w-8xl mt-24 pt-8 mx-auto bg-[#EDEEF6] rounded-lg shadow-lg overflow-hidden">
    <h2 className="  text-4xl font-bold text-[#0977BE] pb-6 py-3 "> Our cars </h2>
      <div className="flex items-center justify-between">
        <button
          className="p-3 ml-8 text-white bg-[#0977BE] rounded-full hover:bg-[#93AEF5]"
          onClick={prevSlide}
        >
          &lt;
        </button>

        <div className="flex-1 p-4 text-center flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 p-4 ml-8">
            <h2 className="text-3xl font-bold mb-2 text-[#0977BE]">
              {slides[currentIndex].title}
            </h2>
            <p className="text-grey-700 font-medium mb-4">
              {slides[currentIndex].description}
            </p>
            <a
              href="https://www.wandaloo.com/autonews/"
              className="inline-block bg-[#0977BE] text-white py-2 px-4 rounded-lg hover:bg-[#93AEF5] transition duration-300"
            >
              En savoir plus
            </a>
          </div>
          <div className="w-full md:w-1/2 p-4 mr-8">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-50 h-50 rounded-lg shadow-lg"
            />
          </div>
        </div>

        <button
          className="p-3 mr-8 text-white bg-[#0977BE] rounded-full hover:bg-[#93AEF5]"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
    </div>
   
  );
}

export default CarCarousel;
