import React, { useState, useRef, useCallback } from "react";
import { MapPinIcon, GlobeAltIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

function HomepageHero() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "",
  });

  const autocompleteFromRef = useRef(null);
  const autocompleteToRef = useRef(null);
  const dateInputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDVPppkMKTKJdKzadu1Pd3WunqeKz5eSdY',
    libraries: ["places"],
  });

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

  // Handle date input focus
  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
      dateInputRef.current.click();
    }
  };

  // Handle place selection for "from" and "to" fields
  const handlePlaceChanged = useCallback((type) => {
    if (type === "from" && autocompleteFromRef.current) {
      const place = autocompleteFromRef.current.getPlace();
      setFormData({
        ...formData,
        from: place.formatted_address || place.name,
      });
    }
    if (type === "to" && autocompleteToRef.current) {
      const place = autocompleteToRef.current.getPlace();
      setFormData({
        ...formData,
        to: place.formatted_address || place.name,
      });
    }
  }, [formData]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/Homebg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Opaque Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Form Container with Extended Yellow Section */}
      <div className="relative w-2/3 mx-auto bg-yellow-150 rounded-md z-10"> {/* Adjusted padding */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* From Location Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <MapPinIcon className="h-6 w-6 text-gray-500 mr-3" />
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteFromRef.current = autocomplete)}
              onPlaceChanged={() => handlePlaceChanged("from")}
            >
              <input
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl"
                type="text"
                placeholder="Travelling from..."
              />
            </Autocomplete>
          </div>

          {/* To Location Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <GlobeAltIcon className="h-6 w-6 text-gray-500 mr-3" />
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteToRef.current = autocomplete)}
              onPlaceChanged={() => handlePlaceChanged("to")}
            >
              <input
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl"
                type="text"
                placeholder="Travelling to..."
              />
            </Autocomplete>
          </div>

          {/* Date Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full" onClick={handleDateClick}>
            <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
            <input
              ref={dateInputRef}
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl cursor-pointer"
              type="date"
              placeholder="Date you're travelling on"
            />
          </div>

          {/* Passengers Field */}
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomepageHero;
