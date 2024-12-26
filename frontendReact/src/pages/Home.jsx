import React from "react";
import NavBar from "../components/NavBar";
import CarCarousel from "../components/Caroussel";
import RentWay from "../components/RentWay";
import AboutUs from "../components/About";
import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";
import RentalCars from "../components/HomeHeader";
import Ride from "../components/ride";

function Home() {
  return (
    <>
      <NavBar />
      <RentalCars/>
      <Ride/>
      <RentWay/>
      <CarCarousel />
    
     <AboutUs/>
     <Footer/>
    </>
  );
}

export default Home;