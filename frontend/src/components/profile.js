import React, { useState, useRef, useEffect } from 'react';
import { Link, useActionData } from 'react-router-dom'; // Assuming you're using react-router for navigation.
import Logo from '../components/UI/logo';
import axios from 'axios';
import { getUserId } from '../utils/AuthFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './UI/Navbar';
import { REACT_APP_BACKEND_URL } from '../utils/constants';
import FileBase from 'react-file-base64';

const Profile = () => {
  const [formData, setFormData] = useState({
    userid: '',
    age: '',
    name: '',
    email: '',
    phone: '',
    profileImage: null,
    role: '',
    licenseNumber: '',
    licensePhotograph: null,
    faceIDPhoto: null,
    vehicleName: '',
    registrationNumber: '',
    registrationCertificate: null,
    insuranceDocument: null,
    pucCertificate: null,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu
  const [role, setRole] = useState('')
  const fetchData = async () => {
    try {
      const id = getUserId()
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/user/${id}`, {
        headers: {
          'auth-token': token,
        },
      });
      const data = response.data.data;

      if (response.data.success) {
        setFormData(data);
        setRole(data.role)

      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching the profile data.');
    }
  };
  useEffect(() => {

    fetchData();
  }, [role]);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
    }
  };

  const handleFileUpload = (base64Data, fieldName) => {
    // Set the formData with Base64 encoded data for the specific certificate
    setFormData((prev) => ({
      ...prev,
      [fieldName]: base64Data, // Use the base64 data from the file
    }));
  };

  const handleRoleToggle = async () => {
    const updatedRole = role === 'Driver' ? 'Passenger' : 'Driver';
    setRole(updatedRole);

    try {
      const id = getUserId();
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`${REACT_APP_BACKEND_URL}/user/role/${id}`, {
        role: updatedRole,
      }, {
        headers: {
          'auth-token': token,
        },
      });
      window.alert('After change role you have to re-login');
      localStorage.removeItem('authToken');
      if (response.data.success) {
        toast.success('Role updated successfully!');
      } else {
        toast.error('Failed to update role.');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make POST request
    try {
      const id = getUserId()
      const token = localStorage.getItem('authToken')
      const response = await axios.put(`${REACT_APP_BACKEND_URL}/user/${id}`, { data: formData }, {
        headers: {
          'auth-token': token,
        },
      });

      if (response.data.success) {
        // Handle successful response
        toast.success('Profile saved successfully!');
      } else {
        // Handle error response
        toast.error('Failed to save profile.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the profile.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Profile Section */}
        <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <div className="text-center">
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Your Profile</h2>
              <p className="mt-2 text-sm text-gray-600">Manage your account settings</p>
            </div>

            <form onSubmit={handleSubmit}> {/* Add form element */}
              {/* Profile Image Upload Section */}
              <div className="mt-6 flex flex-col items-center">
                <div className="relative w-32 h-32">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
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
                  {/* User ID */}
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">User ID</label>
                    <input
                      type="text"
                      name="userId"
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your User ID"
                      value={formData.userid}
                      onChange={handleChange}
                    />
                  </div>



                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Age */}
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">Age</label>
                    <input
                      type="number"
                      name="age"
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">Gender</label>
                    <select
                      name="gender"
                      className="p-3 border border-gray-300 rounded-md"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Toggle Button for Role */}
                  <div className="flex flex-col mt-4">
                    <label className="text-gray-600 font-medium mb-2">Role</label>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 font-medium">Passenger</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={role === 'Driver'}
                          onChange={handleRoleToggle}
                        />
                        <div className="w-11 h-6 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                      </label>
                      <span className="text-gray-600 font-medium">Driver</span>
                    </div>
                  </div>

                  {
                    role === "Driver" ? <div>
                      {/* Face ID Photo */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Face ID Photo</label>

                        {formData.faceIDPhoto ?

                          <div className="text-gray-500 font-normal p-1">Already Uploaded</div>

                          :
                          <FileBase
                            name="faceIDPhoto"
                            className="p-3 border border-gray-300 rounded-md"
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => handleFileUpload(base64, 'faceIDPhoto')}
                          />
                        }
                      </div>
                      {/* License Photograph */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium p-2">License Photograph</label>

                        {formData.licensePhotograph ?


                          <div className="text-gray-500 font-normal p-1">Already Uploaded
                          </div>

                          :
                          <FileBase
                            name="licensePhotograph"
                            className="p-3 border border-gray-300 rounded-md"
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => handleFileUpload(base64, 'licensePhotograph')} />


                        }
                      </div>
                      {/* License Number */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium p-2">License Number</label>
                        <input
                          type="text"
                          name="licenseNumber"
                          className="p-3 border border-gray-300 rounded-md"
                          placeholder="Enter your license number"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Vehicle Name */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium p-2">Vehicle Name</label>

                        <div className="flex flex-col">
                          <input
                            type="text"
                            name="vehicleName"
                            className="p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your vehicle name"
                            value={formData.vehicleName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Registration Number */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium p-2">Registration Number</label>

                        <input
                          type="text"
                          name="registrationNumber"
                          className="p-3 border border-gray-300 rounded-md"
                          placeholder="Enter your Registration Number"
                          value={formData.registrationNumber}
                          onChange={handleChange}
                        />

                      </div>

                      {/* Registration Certificate */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium p-2">Registration Certificate</label>
                      </div>
                      {formData.registrationCertificate ?
                        <div className="flex flex-col">
                          <div className="text-gray-500 font-normal p-1">Already Uploaded
                          </div>
                        </div>
                        :
                        <div className="flex flex-col">


                          <FileBase
                            name="registrationCertificate"
                            className="p-3 border border-gray-300 rounded-md"
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => handleFileUpload(base64, 'registrationCertificate')} />
                        </div>
                      }


                      {/* Insurance Document */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium p-2">Insurance Document</label>
                      </div>
                      {formData.insuranceDocument ?
                        <div className="flex flex-col">
                          <div className="text-gray-500 font-normal p-1">Already Uploaded
                          </div>
                        </div>
                        :
                        <div className="flex flex-col">


                          <FileBase
                            name="insuranceDocument"
                            className="p-3 border border-gray-300 rounded-md"
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => handleFileUpload(base64, 'insuranceDocument')} />
                        </div>
                      }

                      {/* PUC Certificate */}
                      <div className="flex flex-col">
                        <label className="text-gray-600 font-medium p-2">PUC Certificate</label>
                      </div>
                      {formData.pucCertificate ?
                        <div className="flex flex-col">
                          <div className="text-gray-500 font-normal p-1">Already Uploaded
                          </div>
                        </div>
                        :
                        <div className="flex flex-col">

                          <FileBase
                            name="pucCertificate"
                            className="p-3 border border-gray-300 rounded-md"
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => handleFileUpload(base64, 'pucCertificate')} />
                        </div>
                      }
                    </div> : null}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-900"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
