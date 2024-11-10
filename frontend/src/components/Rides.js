import React, { useEffect, useState } from "react";
import { getUserId, getUserRole } from "../utils/AuthFunctions";
import axios from "axios";

function Rides() {
  const driverId = getUserId();
  const role = getUserRole();
  const [rides, setRides] = useState([]);
  const count = 1;

  const getDriverRides = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/ride?driverId=${
        role == "Driver" ? driverId : null
      }`
    );
    if (response.data.success) {
      setRides(response.data.data);
    }

  };
  useEffect(() => {
    if(role == 'Driver'){
        getDriverRides();
    }
  }, [count]);
  console.log(rides);

  return (
    <>
      {role == "Driver"? (
        <>
          <section className="bg-yellow-100 py-20">
            {" "}
            {/* Outer section remains yellow */}
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8">
                Your Published Rides
              </h2>
              {/* Card container with gray background */}
              {rides.length == 0 ? <div>No Rides Found</div> : null}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200 p-10 rounded-lg">
                {
                    rides.map((value, index) => (
                <div key={index} className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white">
                    
                  <h3 className="font-semibold text-xl">
                    {value.extsource} from to {value.extdestination}
                  </h3>
                  <p>Starting from {value.fare}</p>
                  <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
                    Book Now
                  </button>
                </div>
                    ))
                }
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}

export default Rides;
