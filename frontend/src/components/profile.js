import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation.
import Logo from '../components/UI/logo';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primaryColor shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <h1 className="ml-3 text-2xl font-bold text-black">CarGo</h1>
        </div>
        <div className="relative">
          <button onClick={toggleMenu} className="flex items-center focus:outline-none">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <svg
                className="w-10 h-10 text-black"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 12a4 4 0 100-8 4 4 0 000 8zm-1 9a7 7 0 0114 0h-2a5 5 0 00-10 0h-2a7 7 0 0114 0h-2a5 5 0 00-10 0H3a9 9 0 0118 0h2a7 7 0 00-14 0h2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

           {/* Dropdown Menu */}
           {menuOpen && (
            <div
              ref={dropdownRef} // Reference to dropdown
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
            >
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/rides" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Your Rides
              </Link>
              <Link to="/payments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Payments
              </Link>
              <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Help
              </Link>
              <Link to="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Home
              </Link>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Profile Section */}
      <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Your Profile</h2>
            <p className="mt-2 text-sm text-gray-600">Manage your account settings</p>
          </div>

          {/* Profile Image Upload Section */}
          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-32 h-32">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="rounded-full h-full w-full object-cover"
                />
              ) : (
                <svg
                  className="text-gray-300 w-full h-full rounded-full"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 12a4 4 0 100-8 4 4 0 000 8zm-1 9a7 7 0 0114 0h-2a5 5 0 00-10 0h-2a7 7 0 0114 0h-2a5 5 0 00-10 0H3a9 9 0 0118 0h2a7 7 0 00-14 0h2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <label
                htmlFor="profileImageUpload"
                className="absolute bottom-0 right-0 bg-primaryColor text-white p-2 rounded-full cursor-pointer"
              >
                <input
                  id="profileImageUpload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 10.5a2.5 2.5 0 115 0m7 7v4a1 1 0 01-1 1h-4m4-9.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  />
                </svg>
              </label>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-700">Personal Details</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Age</label>
                <input
                  type="number"
                  className="p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your age"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Gender</label>
                <select className="p-3 border border-gray-300 rounded-md">
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">D.O.B</label>
                <input
                  type="date"
                  className="p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  className="p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
{/* Verify Profile Section */}
<div className="mt-8 space-y-4">
  <h3 className="text-xl font-bold text-gray-700">Verify Your Profile</h3>
  <div className="space-y-2">
    <div className="flex items-center">
      {/* Updated Icon */}
      <svg
        className="w-6 h-6 text-orange-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" className="stroke-current" />
        <line x1="12" y1="8" x2="12" y2="16" className="stroke-current" />
        <line x1="8" y1="12" x2="16" y2="12" className="stroke-current" />
      </svg>
      <button
        className="ml-4 text-orange-600"
        onClick={() => document.getElementById('govtIdUpload').click()}
      >
        Verify your Govt. ID
      </button>
      <input
        id="govtIdUpload"
        type="file"
        className="hidden"
      />
    </div>
    <div className="flex items-center">
      {/* Updated Icon */}
      <svg
        className="w-6 h-6 text-orange-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" className="stroke-current" />
        <line x1="12" y1="8" x2="12" y2="16" className="stroke-current" />
        <line x1="8" y1="12" x2="16" y2="12" className="stroke-current" />
      </svg>
      <button className="ml-4 text-orange-600">Confirm email</button>
    </div>
    <div className="flex items-center">
      {/* Updated Icon */}
      <svg
        className="w-6 h-6 text-orange-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" className="stroke-current" />
        <line x1="12" y1="8" x2="12" y2="16" className="stroke-current" />
        <line x1="8" y1="12" x2="16" y2="12" className="stroke-current" />
      </svg>
      <button className="ml-4 text-orange-600">Confirm phone number</button>
    </div>
  </div>
</div>



          {/* Add Vehicle Section */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-700">Add Vehicle</h3>
            <p className="text-gray-600">Add your vehicle details for carpooling</p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-md">Add Vehicle</button>
          </div>

          {/* About You Section */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-700">About You</h3>
            <p className="text-gray-600">Tell us more about yourself</p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Describe yourself here..."
            ></textarea>
          </div>
    

          {/* Save Button */}
          <div className="text-right">
            <button className="py-3 px-6 bg-primaryColor text-white font-semibold rounded-md hover:bg-primaryHover">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
