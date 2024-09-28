import jwt from 'jsonwebtoken';

import dotenv from "dotenv";
dotenv.config();
const JWT_Token = process.env.JWT_Token;

const fetchuser = (req, res, next) => {
    
    const token = req.headers['auth-token'];
console.log(token)
    // Check if the token is provided
    if (!token) {
        return res.status(401).json({ error: "Invalid or Null Token! Enter correct Token." });
    }

    try {
        const data = jwt.verify(token, JWT_Token);
        req.user = data.user; // Attach user data to the request object
        next();
    } catch (error) {
        return res.status(401).json({ error: "Please try to enter the correct token." });
    }
};

export default fetchuser;
