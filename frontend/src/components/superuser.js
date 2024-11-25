import React, { useState, useEffect } from 'react';
import Logo from '../components/UI/logo'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getUserId } from '../utils/AuthFunctions';
import Navbar from './UI/Navbar';
import { format } from 'date-fns';

import { openBase64NewTab } from '../utils/base64certificate';
import { REACT_APP_BACKEND_URL } from '../utils/constants';
const SuperUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [verification, setVerification] = useState(false)
  const navigate = useNavigate()
  const [drivers, setDrivers] = useState([
  ]);
  const handleLogout = () => {
    navigate('/login')
    localStorage.removeItem('token');
  }
  const [rides, setRides] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/user/`, {
        headers: {
          'auth-token': token,
        },
      });
      const ridesResponse = await axios.get(`${REACT_APP_BACKEND_URL}/ride/all`, {
        headers: {
          'auth-token': token,
        },
      });
      if (response.data.success) {
        const filteredDrivers = response.data.data.filter(driver => driver.role === 'Driver');
        setDrivers(filteredDrivers);
      }
      if (ridesResponse.data.success) {
        setRides(ridesResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [verification]);


  const handleViewCertificate = (certificate) => {
    if (certificate) {
      openBase64NewTab(certificate);
    }
    else {
      toast.error('No certificate found');
    }
  };




  const handleApprove = async (id, status) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(`${REACT_APP_BACKEND_URL}/user/verify/${id}`, { status: status }, {
        headers: {
          'auth-token': token,
        },
      });

      if (response.data.success) {
        setVerification(status)
        if (status) {
          toast.success("Driver Approved")

        } else {
          toast.success("Driver Rejected")
        }

      }
    } catch (error) {
      console.error('Error approving driver:', error);
    }
  };
  console.log(rides);

  return (
    <div className="bg-yellow-100 min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Verification Section */}
      <div className=" mx-4">
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-black-600 mb-4">Verify Drivers and Documents</h2>
        
          <div className='overflow-x-auto w-full'>
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6">FaceID</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Age</th>
                  <th className="py-3 px-6">Gender</th>
                  <th className="py-3 px-6">Phone No.</th>
                  <th className="py-3 px-6">License No.</th>
                  <th className="py-3 px-6">License Document</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id} className="border-b text-center">
                    <td className="py-3 px-6">
                      <button onClick={() => handleViewCertificate(driver.faceIDPhoto)} className="text-blue-600">View</button>
                    </td>
                    <td className="py-3 px-6">{driver.name}</td>
                    <td className="py-3 px-6">{driver.age}</td>
                    <td className="py-3 px-6">{driver.gender}</td>
                    <td className="py-3 px-6">{driver.phone}</td>
                    <td className="py-3 px-6">{driver.licenseNumber}</td>
                    <td className="py-3 px-6">
                      <button onClick={() => handleViewCertificate(driver.licensePhotograph)} className="text-blue-600">View</button>

                    </td>

                    <td className="py-3 px-6">{driver.isVerified ? "Approved" : "Not Approved"}</td>
                    <td className="py-3 px-6 space-x-2">
                      {!driver.isVerified ?
                        <button
                          className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
                          onClick={() => handleApprove(driver._id, true)}
                        >
                          Approve
                        </button> : null}

                      <button
                        className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleApprove(driver._id, false)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-black-600 mb-4">All Rides</h2>
          <div className="overflow-x-auto w-full">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6">Driver Name</th>
                  <th className="py-3 px-6">From</th>
                  <th className="py-3 px-6">To</th>
                  <th className="py-3 px-6">Available Seats</th>
                  <th className="py-3 px-6">Fare</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Passengers Name</th>
                  <th className="py-3 px-6">Routes</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {rides.map((ride) => (
                  <tr key={ride._id} className="border-b text-center">
                    <td className="py-3 px-6">{ride.driverName}</td>
                    <td className="py-3 px-6">{ride.extsource}</td>
                    <td className="py-3 px-6">{ride.extdestination}</td>
                    <td className="py-3 px-6">{ride.availableSeats}</td>
                    <td className="py-3 px-6">{ride.fare}</td>
                    <td className="py-3 px-6">{format(new Date(ride.date), 'yyyy-MM-dd')}</td>
                    <td className="py-3 px-6">
                      {ride.passengers && ride.passengers.length > 0 ? (
                        ride.passengers.map((value, index) => (
                          <span key={index}>{value.name}{index !== ride.passengers.length - 1 && ', '}</span>
                        ))
                      ) : (
                        <span>No passengers</span>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {ride.route && ride.route.length > 0 ? (
                        ride.route.map((value, index) => (
                          <span key={index}>{value}{index !== ride.route.length - 1 && ', '}</span>
                        ))
                      ) : (
                        <span>No route information</span>
                      )}
                    </td>
                    <td className="py-3 px-6">{ride.rideState || 'N/A'}</td> {/* RIDE STATUS DISPLAY */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>


        <ToastContainer />
      </div>
    </div>
  );
};

export default SuperUser;
