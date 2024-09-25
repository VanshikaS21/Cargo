import React from 'react';
import Logo from '../components/UI/logo'; // Adjust the import path as needed

const Profile = () => {
  const userDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    age: 30,
    gender: "Male",
    about: "A passionate traveler who loves carpooling!",
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

      {/* User Profile Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-black-600 mb-4">User Profile</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Age:</strong> {userDetails.age}</p>
          <p><strong>Gender:</strong> {userDetails.gender}</p>
          <p><strong>About:</strong> {userDetails.about}</p>

          <button className="mt-4 px-4 py-2 bg-primaryOrange-light text-white font-semibold rounded hover:bg-primaryOrange">
            View Vehicle Details
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
