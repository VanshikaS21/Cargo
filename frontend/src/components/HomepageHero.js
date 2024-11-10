import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  FaMapPin as MapPinIcon,
  FaGlobe as GlobeAltIcon,
  FaCalendarAlt as CalendarIcon,
  FaUser as UserIcon,
} from "react-icons/fa";
import {
  Autocomplete,
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { getUserId, getUserRole } from "../utils/AuthFunctions";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function HomepageHero({ rides, setRides }) {
  const driverId = getUserId();
  
  const emptyData = {
    from: "",
    to: "",
    date: "",
    fare: 0,
    passengers: "",
    distance: 0,
    driverId: driverId,
  }
  const [formData, setFormData] = useState(emptyData);
  const [distance, setDistance] = useState("");
  const role = getUserRole();
  const Navigate = useNavigate();
  const [isDataFetched,setIsDataFetched] = useState(false);

  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // State to hold map center
  const autocompleteFromRef = useRef(null);
  const autocompleteToRef = useRef(null);
  const dateInputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDVPppkMKTKJdKzadu1Pd3WunqeKz5eSdY", // Replace with your Google Maps API key
    libraries: ["places"],
  });
  const [inputValues, setInputValues] = useState([""]);

  const handleChange = (e) => {
    const { name, value } = e.target;
        setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChange = (e, index) => {
    const newValues = [...inputValues];
    newValues[index] = e.target.value;
    setInputValues(newValues);
  };
  const addInput = () => {
    setInputValues([...inputValues, ""]);
  };

  // Remove an input at a specific index
  const removeInput = (index) => {
    const newValues = inputValues.filter((_, i) => i !== index);
    setInputValues(newValues);
  };

  const calculateRoute = async () => {
    // Calculate directions after submitting the form
    if (autocompleteFromRef.current && autocompleteToRef.current) {
      const fromPlace = autocompleteFromRef.current.getPlace();
      const toPlace = autocompleteToRef.current.getPlace();

      if (fromPlace && toPlace) {
        // Set map center based on from and to locations
        setCenter({
          lat:
            (fromPlace.geometry.location.lat() +
              toPlace.geometry.location.lat()) /
            2,
          lng:
            (fromPlace.geometry.location.lng() +
              toPlace.geometry.location.lng()) /
            2,
        });

        getRoute(fromPlace.geometry.location, toPlace.geometry.location);
      }
    }
  };

  const getRoute = (fromLocation, toLocation) => {
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
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      distance: distance,
    }));
  }, [distance]);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      routes: inputValues,
    }));
  }, [inputValues]);

  const getDriverRides = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/ride?driverId=${
        role == "Driver" ? driverId : null
      }`
    );
    if (response.data.success) {
      setRides(response.data.data);
    }
  }
  if(!isDataFetched){
    if(role == "Driver"){
      getDriverRides();
    }
    setIsDataFetched(true);
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role == "Driver") {
      const response = await axios.post(
        "http://localhost:5000/api/ride/",
        formData
      );
      if(response.data.success){
        setFormData(emptyData);
        toast.success("Ride published Successfully!"); // Show success message
        setRides(prev =>[ ...prev]);
        getDriverRides();
      }
      
    } else {
      await calculateRoute();
      const response = await axios.get(
        `http://localhost:5000/api/ride?to=${formData.to}&from=${formData.from}&passengers=${formData.passengers}&date=${formData.date}`
      );
      if (response.data.success) {
        setRides(response.data.data);
        console.log(rides);
      } else {
        setRides([]);
      }
    }
  };

  const handlePlaceChanged = useCallback(
    (type) => {
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
    },
    [formData]
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col justify-center items-center w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/Homebg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Opaque Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Form Container with Extended Yellow Section */}
      <div className="relative w-2/3 mx-auto bg-yellow-150 rounded-md z-10 my-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* From Location Field */}
          <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
            <MapPinIcon className="h-6 w-6 text-gray-500 mr-3" />
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteFromRef.current = autocomplete)
              }
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
              onLoad={(autocomplete) =>
                (autocompleteToRef.current = autocomplete)
              }
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

          {role == "Driver" ? (
            <div className="flex justify-center">
              <button
                className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
                onClick={() => calculateRoute()}
              >
                Calculate Distance
              </button>
            </div>
          ) : null}

          {/* Date Field */}
          <div
            className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full"
            onClick={() => dateInputRef.current.focus()}
          >
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
              max="6"
            />
          </div>

          {role === "Driver" ? (
            <>
              <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
                <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
                <input
                  name="fare"
                  value={formData.fare}
                  onChange={handleChange}
                  className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl"
                  type="number"
                  placeholder="Fare"
                  min="1"
                />
              </div>
              {inputValues.map((value, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <div className="w-full bg-gray-100 py-3 px-8 flex items-center rounded-full">
                    <input
                      className="w-full bg-gray-100 py-1 px-2 leading-tight focus:outline-none placeholder:text-black text-xl"
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder={`Route ${index + 1}`}
                      style={{ marginRight: "5px" }}
                    />
                    <button
                      type="button"
                      className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
                      onClick={() => removeInput(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
                  onClick={() => addInput()}
                >
                  Add
                </button>
              </div>
            </>
          ) : null}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white font-semibold py-2 px-4 rounded"
            >
              {role == "Driver" ? "Publish Ride" : "Search"}
            </button>
          </div>
        </form>
      </div>

      {/* Google Map */}
      <div className="relative w-2/3 h-96 mt-6 mb-6">
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
            border: "2px solid #ccc", // Set your desired border color and width
            borderRadius: "8px", // Optional: add border radius for rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Set your desired box shadow
          }}
          center={center} // Use the state to set center
          zoom={10} // Adjust the zoom level as needed
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
      <div className="text-black font-extrabold mt-4 text-center my-10 ">
        Distance: {distance} km
      </div>
      {role !== "Driver" && (
  rides.length === 0 ? (
    <div>No Rides Found</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200 p-10 rounded-lg">
      {rides.map((value, index) => (
        <div
          key={index}
          className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white"
        >
          <h3 className="font-semibold text-xl">
            {value.extsource} to {value.extdestination}
          </h3>
          <p>Starting from {value.fare}</p>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
            Book Now
          </button>
        </div>
      ))}
    </div>
  )
)}

      <ToastContainer/>
    </div>

  );
}

export default HomepageHero;
