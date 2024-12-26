import React, { useState } from 'react';

const Ride = () => {
  const [formData, setFormData] = useState({
    location: '',
    pickup_date: '',
    return_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="home bg-[#F9F9F9] mb-6 py-12" id="ride">
      <div className="flex items-center justify-between mb-8">
        <div className="w-2/3 ml-6">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="text-blue-500">Looking</span> to <br />rent a car?
          </h1>
          <p className="text-gray-600 mt-4">It is a long established fact that a reader will...</p>
        </div>
        <div className="w-1/3 mr-10">
          <img src="/kia.jpg" alt="Kia" className="w-full h-auto" />
        </div>
      </div>

      <div className="form-container max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg mt-2">
        <form onSubmit={handleSubmit} className="flex space-x-2 ml-2">
          <div className="input-box flex-1 mb-6">
            <label htmlFor="location" className="block text-lg font-semibold text-gray-700 mb-2">
              Location
            </label>
            <select
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select a city</option>
              <option value="Kenitra">Kenitra</option>
              <option value="Rabat">Rabat</option>
              <option value="Casablanca">Casablanca</option>
            </select>
          </div>
          <div className="input-box flex-1 mb-6">
            <label htmlFor="pickup_date" className="block text-lg font-semibold text-gray-700 mb-2">
              Pick-Up Date
            </label>
            <input
              type="date"
              name="pickup_date"
              id="pickup_date"
              value={formData.pickup_date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="input-box flex-1 mb-6">
            <label htmlFor="return_date" className="block text-lg font-semibold text-gray-700 mb-2">
              Return Date
            </label>
            <input
              type="date"
              name="return_date"
              id="return_date"
              value={formData.return_date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        </form>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <input
            type="submit"
            value="Submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Ride;
