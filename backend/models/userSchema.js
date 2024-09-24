import mongoose from "mongoose";
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['Super User', 'Passenger', 'Driver'],default:'Passenger' },
    phone: { type: Number, default:0},
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    about: { type: String }, 
    licenseNumber: { type: String }, // Only for drivers
    licensePhotograph: { type: String }, // URL of license image, for drivers
    faceIDPhoto: { type: String }, // URL of face ID photo, for drivers
    rating: { type: Number, default: 0 }, // Average rating (Driver/Passenger)
    vehicle: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }], // Reference to Vehicle schema
    isVerified: { type: Boolean, default: false }, // For Super User verification
}, { timestamps: true }); // Adds createdAt and updatedAt

export default mongoose.model('User', userSchema);

