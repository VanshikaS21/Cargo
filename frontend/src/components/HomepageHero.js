import React, { useState, useRef, useCallback, useEffect } from "react";
import { FaRupeeSign, FaDollarSign } from 'react-icons/fa';
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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function HomepageHero({ rides, setRides }) {
  const driverId = getUserId();
  const passengerId = getUserId();
  const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
  const emptyData = {
  from: "",
  to: "",
  date: "",
  fare: 0,
  passengers: "",
  distance: 0,
  driverId: driverId,
}
  const todayDate = getTodayDate();
  const [formData, setFormData] = useState(emptyData);
  const [ride,setRide] = useState({});
  const [formDataCopy,seFormDataCopy] = useState();
  const [distance, setDistance] = useState("");
  const role = getUserRole();
  const [isDataFetched,setIsDataFetched] = useState(false);
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
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
  const removeInput = (index) => {
    const newValues = inputValues.filter((_, i) => i !== index);
    setInputValues(newValues);
  };
    useEffect(() => {
      // Dynamically load the Razorpay script
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
  }, []);
  const handlePaymentSuccess = async(selectedRide)=>{
        const response = await axios.get(
          `http://localhost:5000/api/ride/book?userId=${driverId}&rideId=${selectedRide._id}&source=${formDataCopy.from}&destination=${formDataCopy.to}&passengers=${formDataCopy.passengers}`
        );
        if (response.data.success) {
          setRides(response.data.data);
          window.location.reload();
        }
  }
  const handlePayment = (selectedRide) => {

      console.log(selectedRide.fare);
      console.log(formDataCopy.passengers);
      const payment_amount = Number(selectedRide.fare) * Number(formDataCopy.passengers) *100;
      console.log(payment_amount);
      const options = {
        key: "rzp_test_YJBXNlTk3aEt8i",  // Replace with your Razorpay Test Key ID
        amount: payment_amount,               // Amount in the smallest currency unit (e.g., 50000 = ₹500)
        currency: "INR",
        name: "Cargo",
        description: "Test Payment",
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        handler: function (response) {
          handlePaymentSuccess(selectedRide);
        },
        notes: {
          address: "Hello World"
        },
        theme: {
          color: "#F37254"
        }
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  };
  const handleBooking = (value)=>{
      console.log(value);
      setRide({...value});
      handlePayment(value);
  }
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
          toast.success(`Distance Calculated: ${km.toFixed(2)} km`);
          setDistance(km.toFixed(2)); // Store distance in km
        } else {
          console.error("Error fetching directions:", result);
          toast.error("Unable to calculate distance. Please try again.");
        }
      }
    );
  };
  const [bookedRides, setBookedRides] = useState([]);

  useEffect(() => {
    const fetchBookedRides = async () => {
      const userId = getUserId(); 
      if (!userId) {
        toast.error("User ID is missing.");
        return;  // Exit if userId is not available
      }
  
      try {
        const response = await axios.post(`http://localhost:5000/api/ride/getPassengerRides`, {
          userId: userId,
        });
  
        if (response.data.success) {
          console.log(response.data);
          setBookedRides(response.data.data.rides);
        } else {
          toast.error("Failed to fetch booked rides");
        }
      } catch (error) {
        console.error("Error fetching booked rides:", error);
        toast.error("An error occurred while fetching booked rides.");
      }
    };
  
    fetchBookedRides();
  }, [driverId]);  // The effect will run again if `driverId` changes
  
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
  useEffect(() => {
    console.log(ride,"useeffect")
  }, [ride]);
  const getDriverRides = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/ride?driverId=${
        role === "Driver" ? driverId : null
      }`
    );
    if (response.data.success) {
      setRides(response.data.data);
    }
  }
  useEffect(() => {
    if (role === "Driver" && !isDataFetched) {
      getDriverRides();
      setIsDataFetched(true);
    }
  }, [role, isDataFetched]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.from || !formData.to || !formData.date || !formData.passengers) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
  
    if (role === "Driver") {
      const response = await axios.post(
        "http://localhost:5000/api/ride/",
        formData
      );
      if (response.data.success) {
        setFormData(emptyData);
        toast.success("Ride published Successfully!");
        setRides((prev) => [...prev]);
        getDriverRides();
      }
    } else {
      await calculateRoute();
      seFormDataCopy(formData);
      const response = await axios.get(
        `http://localhost:5000/api/ride?to=${formData.to}&from=${formData.from}&passengers=${formData.passengers}&date=${formData.date}`
      );
      if (response.data.success) {
        console.log(response.data,"success")
        setRides(response.data.data);
      } else {
        console.log(response.data,"fail")
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
  const cancelBooking = async (rideId, passengerId, passengersCount) => {
    // Show a confirmation dialog to the user
    const confirmCancel = window.confirm("Are you sure you want to cancel the booking?");
    
    // If user clicks "OK" (true), proceed with the cancellation
    if (confirmCancel) {
      try {
        const response = await axios.post("http://localhost:5000/api/ride/cancelPassengerRide", {
          rideId,
          passengerId,
          passengersCount,
        });
    
        if (response.data.success) {
          alert("Booking cancelled successfully!");
          // Optionally, refresh the rides list to reflect the changes
          window.location.reload();
        } else {
          alert(`Failed to cancel booking: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("An error occurred while cancelling the booking.");
      }
    } else {
      // If user clicks "Cancel", do nothing
      alert("Booking cancellation was aborted.");
    }
  };
  

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
      <form onSubmit={handleSubmit} onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} className="space-y-4">
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

          {role === "Driver" ? (
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
              min={todayDate}
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
              <FaRupeeSign className="h-6 w-6 text-gray-500 mr-3" />
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
                      placeholder={`Station ${index + 1}`}
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
                  Add Station
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
              {role === "Driver" ? "Publish Ride" : "Search"}
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



      {/* Ride Management Section */}
      {role !== "Driver" && (
      rides?.length === 0 ? (
      <div className="bg-gray-200 p-10 rounded-lg w-full" style={{ zIndex: 999 }}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Sorry! No Rides are available for this Route... :-(
      </h2>
      </div>
      ) : (
      <div className="bg-gray-200 p-10 rounded-lg w-full" style={{ zIndex: 999 }}>
    <div className="bg-gray-200 rounded-lg w-full" style={{ zIndex: 999 }}>
    <h2 className="text-2xl font-bold text-center w-full">
        Rides available for this route...
      </h2>
  </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200 p-10 rounded-lg" style={{ zIndex: 999 }}>

      {rides?.map((value, index) => (
        <div
          key={index}
          className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white"
        >
          <h3 className="font-semibold text-xl">
            {value.extsource} to {value.extdestination}
          </h3>
          <p>Fare/Passenger: ₹ {value.fare}</p>
          <p>Available Seats: {value.availableSeats}</p>
                {value.route && value.route.length > 0 ? (
                value.route.map((routeValue, routeIndex) => (
                <span key={routeIndex}>
                  {routeValue}
                  {routeIndex < value.route.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <span>No route specified</span>
            )}
            <br />
          <button onClick={() => handleBooking(value)} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
            Book Now
          </button>
        </div>
      ))}
    </div>
      </div>


  )
)}


{/* Passenger-exclusive Section */}

{role !== "Driver" && (
  <div className="w-full bg-yellow-100 rounded-lg p-8 shadow-lg" style={{ zIndex: 999 }}>
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
      Your Booked Rides
    </h2>
    {bookedRides.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedRides.map((ride, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {ride.extsource} to {ride.extdestination}
            </h3>
            <div className="flex flex-col gap-2 text-gray-600">
              <p>
                <span className="font-semibold">Fare:</span> ₹{ride.fare}
              </p>
              <p>
                <span className="font-semibold">Available Seats:</span>{" "}
                {ride.availableSeats}
              </p>
              <p>
                <span className="font-semibold">Booked Seats:</span>{" "}
                {ride.bookedSeats}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Intl.DateTimeFormat("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(ride.date))}
              </p>
            </div>
            <button
              onClick={() =>
                cancelBooking(ride._id, passengerId, ride.bookedSeats)
              }
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-700 text-lg mt-4">
        You haven’t booked any rides yet!
      </div>
    )}
  </div>
)}



      <ToastContainer/>
    </div>

  );
}
export default HomepageHero;