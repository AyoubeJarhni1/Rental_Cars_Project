import React from "react";
import NavBar from "../components/NavBar";
import CarCarousel from "../components/Caroussel";
import RentWay from "../components/RentWay";
import AboutUs from "../components/About";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <NavBar />
      <CarCarousel />
      <RentWay/>
     <AboutUs/>
     <Footer/>
    </>
  );
}

export default Home;