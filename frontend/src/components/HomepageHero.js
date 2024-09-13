import React, { useState, useRef } from "react";
import { MapPinIcon, GlobeAltIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

function HomepageHero() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "",
  });

  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/desired-backend-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Trigger the date picker when the surrounding div is clicked
  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus(); // Focus the input field to show the date picker
      dateInputRef.current.click(); // Simulate a click to open the date picker
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-10">
      <div className="relative w-2/3 mx-auto h-2/3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <MapPinIcon className="h-6 w-6 text-gray-500 mr-3" />
            <input
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl"
              type="text"
              placeholder="Travelling from..."
            />
          </div>
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <GlobeAltIcon className="h-6 w-6 text-gray-500 mr-3" />
            <input
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl"
              type="text"
              placeholder="Travelling to..."
            />
          </div>
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full" onClick={handleDateClick}>
            <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
            <input
              ref={dateInputRef}
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl cursor-pointer"
              type="date"  // Changed to 'date' to directly open the date picker
              placeholder="Date you're travelling on"
            />
          </div>
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
            <input
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl"
              type="number"
              placeholder="Number of Passengers"
              min="1"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomepageHero;
