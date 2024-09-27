import React from 'react';

function HowItWorks() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">How CarGo Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            {/* Updated Image Source for "Find a Ride" */}
            <img src="/Findaride.jpg" alt="Find a Ride" className="mx-auto mb-4 h-36" />
            <h3 className="font-semibold text-xl">Find a Ride</h3>
            <p>Choose a ride that matches your route and timing.</p>
          </div>
          <div className="text-center">
            {/* Updated Image Source for "Contact Driver" */}
            <img src="/Contactdriver.png" alt="Contact Driver" className="mx-auto mb-4 h-36" />
            <h3 className="font-semibold text-xl">Contact Driver</h3>
            <p>Connect with the driver and confirm your ride.</p>
          </div>
          <div className="text-center">
            {/* Updated Image Source for "Share & Save" */}
            <img src="/Shareandsave.png" alt="Share and Save" className="mx-auto mb-4 h-36" />
            <h3 className="font-semibold text-xl">Share & Save</h3>
            <p>Share the ride and save on travel costs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
