import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getUserId } from '../utils/AuthFunctions';
import Navbar from '../components/UI/Navbar';

import { openBase64NewTab } from '../utils/base64certificate';
import { REACT_APP_BACKEND_URL } from '../utils/constants';
const SuperUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate=useNavigate()
  const [drivers, setDrivers] = useState([
  ]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/user/`, {
        headers: {
          'auth-token': token,
        },
      });
      if (response.data.success) {
        const filteredDrivers = response.data.data.filter(driver => driver.role === 'Driver');
        setDrivers(filteredDrivers);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);


  const handleViewCertificate = (certificate) => {
    if (certificate) {
      openBase64NewTab(certificate);
    }
      else{
        toast.error('No certificate found');
      }
  };


  const handleSearch = () => {
    // Dummy results
    setResults([
      { type: 'User', id: 'USR001', name: 'John Doe' },
      { type: 'Vehicle', id: 'VEH001', regNo: 'AB1234CD' },
      { type: 'Ride', id: 'RID001', driver: 'Jane Smith' },
    ]);
  };

  const handleApprove = async (id, status) => {
    console.log(id)
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(`${REACT_APP_BACKEND_URL}/user/verify/${id}`, { status:status }, {
        headers: {
          'auth-token': token,
        },
      });

      if (response.data.success) {
        if(status){
          toast.success("Driver Approved")
        }else{
          toast.success("Driver Rejected")
        }
       
      }
    } catch (error) {
      console.error('Error approving driver:', error);
    }
  };


  return (
    <>
    <Navbar />
    <div className=" bg-yellow-100 flex-flex-col p-5">
      {/* Verification Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-black-600 mb-4">Verify Drivers and Documents</h2>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search Driver by Name or ID"
            className="p-4 w-80 bg-gray-100 border-2 border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>

        {/* Drivers Table */}
        <div className="overflow-x-auto">
        <table className=" bg-white rounded-lg shadow-md">
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
                <td className="py-3 px-6">
                  <button onClick={() => handleViewCertificate(driver.faceIDPhoto)} className="text-blue-600">View</button>
                </td>
                <td className="py-3 px-6">{driver.isVerified?"Approved":"Not Approved"}</td>
                <td className="py-3 px-6 space-x-2">
                {!driver.isVerified?
                   <button
                    className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleApprove(driver._id,true)}
                  >
                    Approve
                  </button>:null}
                 
                  <button
                    className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleApprove(driver._id,false)}
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

      {/* Search Section */}
      {/* <section className="mt-12">
        <h2 className="text-xl font-semibold text-black-600 mb-4">Search Users, Vehicles, or Rides</h2>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter User ID, Vehicle Reg No., or Ride ID"
            className="p-4 w-80 bg-gray-100 border-2 border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id} className="py-2 px-4 border-b">
                  {result.type}: {result.name || result.regNo || result.driver}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </section> */}
      <ToastContainer/>
    </div>
    </>
    
  );
};

export default SuperUser;
