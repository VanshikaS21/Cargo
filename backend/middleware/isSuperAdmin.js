import jwt, { decode } from 'jsonwebtoken';

import dotenv from "dotenv";
dotenv.config();
const JWT_Token = process.env.JWT_Token;
if (!JWT_Token) {
    throw new Error("JWT_TOKEN is not defined in environment variables");
}

const isSuperAdmin = (req, res, next) => {
    // Get the authentication token from the request headers
console.log("hi")
    const token = req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token not provided' });
    }

    try {
        // Verify the token and decode its payload
        const decodedToken = jwt.verify(token, JWT_Token);

        // Check if the user role is "SuperUser"
        console.log(decodedToken.user)
        if (!decodedToken.user || decodedToken.user.role !== 'SuperUser') {
            return res.status(403).json({ message: 'You are not authorized to access this resource' });
        }

        // User is authorized, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};

export default isSuperAdmin;
