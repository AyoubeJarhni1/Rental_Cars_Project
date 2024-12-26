import React from "react";

function RentWay() {
  return (
    <section className="ride py-16 px-5 bg-[#F9F9F9]" id="ride">
      <div className="heading text-center mb-12">
        <span className="text-[#0977BE] text-lg font-semibold">How it's Work</span>
        <h1 className="text-3xl font-bold text-[#0977BE] mt-2">Rent With 3 Easy Steps</h1>
      </div>
      <div className="ride-container flex justify-center gap-8">
        <div className="box w-full sm:w-1/3 p-6 bg-white rounded-lg shadow-lg text-center">
          <i className="bx bxs-map text-4xl text-[#0977BE]"></i>
          <h2 className="text-xl font-semibold text-[#3A56E7] mt-4">Choose A Location</h2>
          <p className="text-gray-600 mt-2">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
          </p>
        </div>
        <div className="box w-full sm:w-1/3 p-6 bg-white rounded-lg shadow-lg text-center">
          <i className="bx bxs-calendar-check text-4xl text-[#0977BE]"></i>
          <h2 className="text-xl font-semibold text-[#3A56E7] mt-4">Pick-Up Date</h2>
          <p className="text-gray-600 mt-2">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
          </p>
        </div>
        <div className="box w-full sm:w-1/3 p-6 bg-white rounded-lg shadow-lg text-center">
          <i className="bx bx-calendar-star text-4xl text-[#0977BE]"></i>
          <h2 className="text-xl font-semibold text-[#3A56E7] mt-4">Book A Car</h2>
          <p className="text-gray-600 mt-2">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RentWay;
