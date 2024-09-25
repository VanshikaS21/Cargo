import React, { useState } from 'react';
import Logo from '../components/UI/logo'; // Adjust the import path as needed

const SuperUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [drivers, setDrivers] = useState([
    {
      id: 'DR001',
      name: 'John Doe',
      licenseNo: 'DL123456789',
      licenseDoc: '#',
      carRegDoc: '#',
      status: 'Pending',
    },
    {
      id: 'DR002',
      name: 'Jane Smith',
      licenseNo: 'DL987654321',
      licenseDoc: '#',
      carRegDoc: '#',
      status: 'Approved',
    },
  ]);

  const handleSearch = () => {
    // Logic for fetching search results goes here
    console.log('Search term:', searchTerm);
    // Dummy results
    setResults([
      { type: 'User', id: 'USR001', name: 'John Doe' },
      { type: 'Vehicle', id: 'VEH001', regNo: 'AB1234CD' },
      { type: 'Ride', id: 'RID001', driver: 'Jane Smith' },
    ]);
  };

  const handleApprove = (id) => {
    setDrivers(
      drivers.map(driver =>
        driver.id === id ? { ...driver, status: 'Approved' } : driver
      )
    );
  };

  const handleReject = (id) => {
    setDrivers(
      drivers.map(driver =>
        driver.id === id ? { ...driver, status: 'Rejected' } : driver
      )
    );
  };

  return (
    <div className="p-8 bg-yellow-200 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 bg-white shadow-md">
        {/* CarGo Logo */}
        <div className="flex items-center">
          <Logo className="h-10 w-10 mr-2" />
          <span className="text-3xl font-bold text-black">CarGo</span>
        </div>
        <nav>
          <ul className="flex space-x-8 text-gray-600">
            <li className="hover:text-gray-800">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-gray-800">
              <a href="#">Verify Documents</a>
            </li>
            <li className="hover:text-gray-800">
              <a href="#">Search Users</a>
            </li>
            <li className="hover:text-gray-800">
              <a href="#">Search Vehicles</a>
            </li>
            <li className="hover:text-gray-800">
              <a href="#">Search Rides</a>
            </li>
            <li>
              <button className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

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
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6">Driver ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">License No.</th>
              <th className="py-3 px-6">License Document</th>
              <th className="py-3 px-6">Car Registration</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b">
                <td className="py-3 px-6">{driver.id}</td>
                <td className="py-3 px-6">{driver.name}</td>
                <td className="py-3 px-6">{driver.licenseNo}</td>
                <td className="py-3 px-6">
                  <a href={driver.licenseDoc} className="text-blue-600">View</a>
                </td>
                <td className="py-3 px-6">
                  <a href={driver.carRegDoc} className="text-blue-600">View</a>
                </td>
                <td className="py-3 px-6">{driver.status}</td>
                <td className="py-3 px-6 space-x-2">
                  <button
                    className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleApprove(driver.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-primaryOrange-light hover:bg-primaryOrange text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleReject(driver.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Search Section */}
      <section className="mt-12">
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

        {/* Display Results */}
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
      </section>
    </div>
  );
};

export default SuperUser;
