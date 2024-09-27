import React from 'react';

function PopularPools() {
  return (
    <section className="bg-yellow-200 py-20"> {/* Outer section remains yellow */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Popular Carpool Options</h2>
        {/* Card container with gray background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200 p-10 rounded-lg">
          <div className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white"> {/* Individual card background white */}
            <h3 className="font-semibold text-xl">Ludhiana to Chandigarh</h3>
            <p>Starting from ₹500</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">Book Now</button>
          </div>
          <div className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white"> {/* Individual card background white */}
            <h3 className="font-semibold text-xl">New-Delhi to Chandigarh</h3>
            <p>Starting from ₹300</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">Book Now</button>
          </div>
          <div className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-white"> {/* Individual card background white */}
            <h3 className="font-semibold text-xl">Mumbai to Pune</h3>
            <p>Starting from ₹450</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">Book Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularPools;
