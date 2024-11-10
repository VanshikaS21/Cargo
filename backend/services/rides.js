import { ReceiptRefundIcon } from '@heroicons/react/16/solid';
import Ride from '../models/rideSchema.js';  // Import the Ride model

async function getRides(req) {
  try {
    // Check if driverId is present in the query parameters
    if (req.query.driverId) {
      // If driverId is provided, find rides for the specific driver
      const rides = await Ride.find({ driver: req.query.driverId });

      if (!rides || rides.length === 0) {
        console.log('No rides found for this driver!');
        return { success: false, message: 'No rides found for this driver' };
      }

      console.log('Rides fetched successfully for driver');
      return rides;
    } else {
      // If driverId is not provided, handle the case for passengers
      const { to, from, passengers,date} = req.query;
      console.log(to,from,passengers,date);

      // If 'to', 'from', and 'passenger' are provided, fetch rides based on those criteria
      const rides = await Ride.find({ 
        extsource:from, 
        extdestination:to, 
        date:date,
        availableSeats: { $gte: Number(passengers) } // Example condition, adjust as needed
      });

      if (!rides || rides.length === 0) {
        console.log('No rides found matching your criteria!');
        return [];
      }

      console.log('Rides fetched successfully for passengers');
      return rides;
    }
  } catch (error) {
    console.error('Error fetching rides:', error);
    return { success: false, message: 'Error fetching rides', error };
  }
}


async function createRide(request) {
  try {
    const newRide = new Ride({
      driver: request.body.driverId,  // Replace with actual driver user ID
      extsource: request.body.from,
      extdestination: request.body.to,
      date: request.body.date,
      availableSeats: Number(request.body.passengers),
      fare: Number(request.body.fare),
      route: request.body.routes,
      rideState: 'upcoming',
      totalDistance: Number(request.body.distance),  // Example distance
      estimatedDuration: 45,  // Example duration in minutes
    });

    // Save the new ride to the database
    await newRide.save();
    console.log('New ride created successfully!');
    return newRide;
  } catch (error) {
    console.error('Error creating ride:', error);
  }
}

// Call the function to create the ride
export {createRide,getRides}
