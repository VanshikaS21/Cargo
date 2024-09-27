import React from 'react';
import { FaBusAlt, FaUserShield, FaMobileAlt } from 'react-icons/fa';

function ServiceCards() {
  const services = [
    {
      icon: <FaBusAlt size={40} className="text-blue-500 mx-auto mb-4" />,
      title: "Wide Range of Rides",
      description: "Choose from a variety of rides at low prices as per your preferences.",
    },
    {
      icon: <FaUserShield size={40} className="text-green-500 mx-auto mb-4" />,
      title: "Travel with Confidence",
      description: "We verify all drivers and profiles to ensure safe and reliable travel experiences for everyone.",
    },
    {
      icon: <FaMobileAlt size={40} className="text-orange-500 mx-auto mb-4" />,
      title: "Quick and Easy Booking",
      description: "With our simple Interface, you can find and book a ride near you within minutes, hassle-free.",
    },
  ];

  return (
    <section className="bg-gray-100 pt-12 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 border rounded-lg shadow hover:shadow-lg transition text-center">
              {service.icon}
              <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
