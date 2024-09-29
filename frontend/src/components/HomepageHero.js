import React, { useState, useRef, useCallback } from "react";
import { FaMapPin as MapPinIcon, FaGlobe as GlobeAltIcon, FaCalendarAlt as CalendarIcon, FaUser as UserIcon } from 'react-icons/fa';
import { Autocomplete, useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

function HomepageHero() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "",
  });
  const [distance, setDistance] = useState("");

  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // State to hold map center
  const autocompleteFromRef = useRef(null);
  const autocompleteToRef = useRef(null);
  const dateInputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDVPppkMKTKJdKzadu1Pd3WunqeKz5eSdY', // Replace with your Google Maps API key
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

    // Calculate directions after submitting the form
    if (autocompleteFromRef.current && autocompleteToRef.current) {
      const fromPlace = autocompleteFromRef.current.getPlace();
      const toPlace = autocompleteToRef.current.getPlace();

      if (fromPlace && toPlace) {
        // Set map center based on from and to locations
        setCenter({
          lat: (fromPlace.geometry.location.lat() + toPlace.geometry.location.lat()) / 2,
          lng: (fromPlace.geometry.location.lng() + toPlace.geometry.location.lng()) / 2,
        });

        calculateRoute(fromPlace.geometry.location, toPlace.geometry.location);
      }
    }
  };

  const calculateRoute = (fromLocation, toLocation) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: fromLocation,
        destination: toLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const route = result.routes[0];
          const km = route.legs[0].distance.value / 1000; // Convert meters to kilometers
          setDistance(km.toFixed(2)); // Store distance in km
        } else {
          console.error("Error fetching directions:", result);
        }
      }
    );
  };

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
    <div className="flex flex-col justify-center items-center w-full bg-cover bg-center relative" style={{ backgroundImage: `url('/Homebg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Opaque Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Form Container with Extended Yellow Section */}
      <div className="relative w-2/3 mx-auto bg-yellow-150 rounded-md z-10 my-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* From Location Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <MapPinIcon className="h-6 w-6 text-gray-500 mr-3" />
            <Autocomplete onLoad={(autocomplete) => (autocompleteFromRef.current = autocomplete)} onPlaceChanged={() => handlePlaceChanged("from")}>
              <input name="from" value={formData.from} onChange={handleChange} className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl" type="text" placeholder="Travelling from..." />
            </Autocomplete>
          </div>

          {/* To Location Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <GlobeAltIcon className="h-6 w-6 text-gray-500 mr-3" />
            <Autocomplete onLoad={(autocomplete) => (autocompleteToRef.current = autocomplete)} onPlaceChanged={() => handlePlaceChanged("to")}>
              <input name="to" value={formData.to} onChange={handleChange} className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl" type="text" placeholder="Travelling to..." />
            </Autocomplete>
          </div>

          {/* Date Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full" onClick={() => dateInputRef.current.focus()}>
            <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
            <input ref={dateInputRef} name="date" value={formData.date} onChange={handleChange} className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl cursor-pointer" type="date" placeholder="Date you're travelling on" />
          </div>

          {/* Passengers Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
            <input name="passengers" value={formData.passengers} onChange={handleChange} className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl" type="number" placeholder="Number of Passengers" min="1" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded">Search</button>
          </div>
        </form>
      </div>

      {/* Google Map */}
      <div className="relative w-2/3 h-96 mt-6 mb-6">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center} // Use the state to set center
          zoom={10} // Adjust the zoom level as needed
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
       

      </div>
      <div className="text-black font-extrabold mt-4 text-center my-10 ">
        Distance: {distance} km
      </div>
    </div>
  );
}

export default HomepageHero;
