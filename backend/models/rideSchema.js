import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  passengers: [{ passengerId: { type: Schema.Types.ObjectId, ref: 'User' }, source: { type: String, required: true }, destination: { type: String, required: true },name:{ type: String, required: true },passengers:{type:Number ,required:true}}],
  extsource: { type: String, required: true },
  extdestination: { type: String, required: true },
  date: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 },
  fare: { type: Number, required: true },
  route: [{ type: String }],
  rideState: { type: String, enum: ['upcoming', 'scheduled', 'ongoing', 'cancelled', 'completed'], default: 'upcoming' },
  totalDistance: { type: Number },
  estimatedDuration: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

rideSchema.pre('save', async function (next) {
  const User = mongoose.model('User');
  for (const passenger of this.passengers) {
    const user = await User.findById(passenger.passengerId);
    if (!user || user.role !== 'Passenger') {
      return next(new Error('All passengers must have the role "Passenger".'));
    }
  }
  next();
});

export default mongoose.model('Ride', rideSchema);
