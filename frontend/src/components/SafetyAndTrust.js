import React from 'react';
import { FaUserCheck, FaLock, FaHeadset } from 'react-icons/fa'; // Importing icons from react-icons

function SafetyAndTrust() {
  return (
    <section className="bg-yellow-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-center">Your Safety & Trust is Our Priority</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1: Verified Drivers */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
            <div className="mb-4 text-blue-600">
              <FaUserCheck size={40} className="mx-auto" />
            </div>
            <h3 className="font-semibold text-2xl mb-2">Verified Drivers</h3>
            <p className="text-gray-600">
              All drivers go through a stringent verification process and are rated by our trusted community.
            </p>
          </div>

          {/* Card 2: Secure Payments */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
            <div className="mb-4 text-green-600">
              <FaLock size={40} className="mx-auto" />
            </div>
            <h3 className="font-semibold text-2xl mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Enjoy peace of mind with secure payment options, ensuring your financial data is always protected.
            </p>
          </div>

          {/* Card 3: 24/7 Support */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
            <div className="mb-4 text-red-600">
              <FaHeadset size={40} className="mx-auto" />
            </div>
            <h3 className="font-semibold text-2xl mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is available around the clock to assist you with any concerns or queries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SafetyAndTrust;
