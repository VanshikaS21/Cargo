
import Ride from "../models/rideSchema.js"; // Import the Ride model
import User from "../models/userSchema.js"; // Import the Ride model

async function getAllRides(req) {
  try {
    // Fetch all rides that are not cancelled
    const rides = await Ride.find();

    const ridesWithDriverName = await Promise.all(rides.map(async (ride) => {
      // Fetch the driver from the User table using the driverId in the ride
      const driver = await User.findById(ride.driver);
      const driverName = driver ? driver.name : "Unknown Driver";  // Default if no driver found

      // Return the ride with the driver's name added or replacing driverId
      return {
        ...ride.toObject(), // Convert ride to plain object
        driverName,  // Add driverName field to the ride object
      };
    }));

    if (!rides || rides.length === 0) {
      console.log("No rides found!");
      return [];
    }
    console.log("Rides fetched successfully");
    return ridesWithDriverName;
  } catch (error) {
    console.error("Error fetching rides:", error);
    return [];
  }
}


async function getRides(req) {
  try {
    // Check if driverId is present in the query parameters
    if (req.query.driverId) {
      // If driverId is provided, find rides for the specific driver
      const rides = await Ride.find({
        driver: req.query.driverId,
        rideState: { $ne: "cancelled" },
      });

      if (!rides || rides.length === 0) {
        console.log("No rides found for this driver!");
        return { success: false, message: "No rides found for this driver" };
      }

      console.log("Rides fetched successfully for driver");
      return rides;
    } else {
      // If driverId is not provided, handle the case for passengers
      const { to, from, passengers, date } = req.query;
      console.log(to, from, passengers, date);
      const startOfDay = new Date(date + "T00:00:00.000Z"); // Midnight UTC
      const endOfDay = new Date(date + "T23:59:59.999Z"); // End of the day in UTC
      // If 'to', 'from', and 'passenger' are provided, fetch rides based on those criteria
      const rides = await Ride.find({
        extsource: { $regex: from, $options: "i" }, // Match "from" value in extsource, case-insensitive
        extdestination: { $regex: to, $options: "i" }, // Match "to" value in extdestination, case-insensitive
        date: { $gte: startOfDay, $lte: endOfDay }, // Match rides within the day
        rideState: { $ne: "cancelled" },
        availableSeats: { $gte: Number(passengers) }, // Example condition, adjust as needed
      });

      if (!rides || rides.length === 0) {
        console.log("No rides found matching your criteria!");
        return [];
      }

      console.log("Rides fetched successfully for passengers");
      return rides;
    }
  } catch (error) {
    console.error("Error fetching rides:", error);
    return { success: false, message: "Error fetching rides", error };
  }
}


async function createRide(request) {
  try {
    const newRide = new Ride({
      driver: request.body.driverId, // Replace with actual driver user ID
      extsource: request.body.from,
      extdestination: request.body.to,
      date: request.body.date,
      availableSeats: Number(request.body.passengers),
      fare: Number(request.body.fare),
      route: request.body.routes,
      rideState: "upcoming",
      totalDistance: Number(request.body.distance), // Example distance
      estimatedDuration: 45, // Example duration in minutes
    });

    // Save the new ride to the database
    await newRide.save();
    console.log("New ride created successfully!");
    return newRide;
  } catch (error) {
    console.error("Error creating ride:", error);
  }
}

async function cancelRide(req) {
  const updatedRide = await Ride.findByIdAndUpdate(
    req.query.id,
    { rideState: "cancelled" },
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied
    }
  );
  if (updatedRide) {
    const rides = await Ride.find({
      driver: { $in: [req.query.driverId, updatedRide.driver] }, // Check if the driver matches either req.query.driverId or updatedRide.driver
      rideState: { $ne: "cancelled" }, // Filter out rides where the rideState is "cancelled"
    });
    return rides;
  }
}
  async function bookRide(req, res) {
    try {
      // Step 1: Fetch user details using userId (if needed, for reference or validation)
      const user = await User.findById(req.query.userId).select(['_id', 'name']);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Step 2: Prepare the passenger data you want to add
      const passengerData = {
        passengerId: user._id,
        source: req.query.source, // Assuming source is passed in the request body
        destination: req.query.destination, // Assuming destination is passed in the request body
        name: user.name, // Assuming passenger's name is passed in the request body
        passengers: req.query.passengers, // Assuming the number of passengers is passed in the request body
      };
  
      // Step 3: Find the ride and update the passengers array
      const updatedRide = await Ride.findByIdAndUpdate(
        req.query.rideId,
        {
          $push: { passengers: passengerData }, // Pushing the new passenger data into the 'passengers' array
          $inc: { availableSeats: -req.query.passengers },
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure validation is applied
        }
      );
  
      if (!updatedRide) {
        return 0;
      }
  
      // Step 4: Respond with the updated ride data
      return 1;
    } catch (error) {
      console.error('Error booking ride:', error);
      return 0;
    }
  
}
// Call the function to create the ride
export { createRide, getRides, cancelRide,bookRide,getAllRides };
