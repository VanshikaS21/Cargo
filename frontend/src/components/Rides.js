import React, { useState } from "react";
import { getUserRole } from "../utils/AuthFunctions";
import axios from "axios";

function Rides({ rides, setRides }) {
  const role = getUserRole();
  const [cancelledPopup, setCancelledPopup] = useState(false);

  const cancleRideHandler = async (id) => {
    // Confirmation popup
    const confirmCancel = window.confirm("Are you sure you want to cancel this ride?");
    if (!confirmCancel) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/ride/cancel?id=${id}`
      );

      if (response.data.success) {
        setRides(response.data.data);
        setCancelledPopup(true); // Show cancelled confirmation popup
      } else {
        alert("Failed to cancel the ride. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling ride:", error);
      alert("An error occurred while cancelling the ride. Please try again.");
    }
  };



  return (
    <>
      {role === "Driver" ? (
        <>
          <section className="bg-yellow-100 py-20">
            {" "}
            {/* Outer section remains yellow */}
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8">Your Published Rides</h2>
              {/* Card container with gray background */}
              {(!Array.isArray(rides) || rides.length === 0) ? (
                <div>No Rides Found</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200 p-10 rounded-lg">
 {rides.map((ride, index) => (
  <div
    key={index}
    className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white"
  >
    <h3 className="font-semibold text-xl">
      {ride.extsource} to {ride.extdestination}
    </h3>
    <p>Fare: ₹{ride.fare}</p>
    <p>Available Seats: {ride.availableSeats}</p>
    <p>Booked Seats: {ride.bookedSeats}</p>
    <p>Date: {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(ride.date))}</p>

    {/* Display Passengers */}
    <div>
      <h4 className="font-semibold mt-4">Bookings Made by:</h4>
      {ride.passengers && ride.passengers.length > 0 ? (
        <ul className="list-disc pl-6">
          {ride.passengers.map((passenger, passengerIndex) => (
            <li key={passengerIndex}>{passenger.name}</li>
          ))}
        </ul>
      ) : (
        <p>No passengers yet.</p>
      )}
    </div>

    {/* Display Routes */}
    <div>
      <h4 className="font-semibold mt-4">Route:</h4>
      {ride.route && ride.route.length > 0 ? (
        <ul className="list-disc pl-6">
          {ride.route.map((routeValue, routeIndex) => (
            <li key={routeIndex}>{routeValue}</li>
          ))}
        </ul>
      ) : (
        <p>No route available.</p>
      )}
    </div>

    <br />

    {/* Conditionally render the cancel button or state message */}
    {ride.rideState === "upcoming" ? (
      <button
        onClick={() => cancleRideHandler(ride._id)}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
      >
        Cancel
      </button>
    ) : (
      <p className="mt-4 text-sm text-gray-500">
        This ride is {ride.rideState}.
      </p>
    )}
  </div>
))}

                </div>
              )}
            </div>
          </section>

          {/* Ride Cancelled Popup */}
          {cancelledPopup && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setCancelledPopup(false)}
            >
              <div
                className="bg-white p-6 rounded shadow-lg text-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
              >
                <h2 className="text-2xl font-bold mb-4">Ride Cancelled</h2>
                <p className="mb-6">The ride has been successfully cancelled.</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => {
                    setCancelledPopup(false); // Close the popup
                    window.location.reload();  // Reload the page
                  }}
                >
                  OK
                </button>

              </div>
            </div>
          )}
        </>
      ) : null}
      
    </>
  );
}

export default Rides;
