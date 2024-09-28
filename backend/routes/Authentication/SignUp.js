import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../../models/userSchema.js"; 

const router = express.Router();

router.post(
    '/signup',
    
    // Validate password to be at least 8 characters long
    body('password', 'Password should have a minimum length of 8').isLength({ min: 8 }),

    // Validate name to have at least 3 characters
    body('name', 'Name should have more than 3 characters').isLength({ min: 3 }),

    // Validate email using a simple regex to contain @ and domain structure
    body('email', 'Invalid email format').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),

    // Validate that the userid is provided and not empty
    body('userid', 'User ID is required').notEmpty(),

    async (req, res) => {
        console.log(req.body)
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Invalid Credentials", errors: errors.array() });
        }

        // Check if the email or userid already exists in the database
        const validateEmail = await User.findOne({ email: req.body.email });
        const validateUserid = await User.findOne({ userid: req.body.userid });

        if (validateEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        if (validateUserid) {
            return res.status(400).json({ success: false, message: 'User ID already exists' });
        }

        try {
            // Hash the password before storing it
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            // Create the new user with only the necessary fields
            const newUser = new User({
                userid: req.body.userid,
                password: hash,
                email: req.body.email,
                name: req.body.name
            });

            // Save the new user to the database
            await newUser.save();

            return res.status(201).json({ success: true, message: 'Successfully signed up' });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    }
);


router.post(
    '/login',
    // Validate password to be at least 8 characters long
    body('password', 'Password should have a minimum length of 8').isLength({ min: 8 }),

    // Validate that the userid is provided and not empty
    body('userid', 'User ID is required').notEmpty(),

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Invalid Credentials", errors: errors.array() });
        }

        const { userid, password } = req.body;

        try {
            // Find user by userid
            const user = await User.findOne({ userid });

            // If user is not found, return an error
            if (!user) {
                return res.status(400).json({ success: false, message: "User not found" });
            }

            // Compare entered password with the hashed password in the database
            const passwordCompare = await bcrypt.compare(password, user.password);

            // If the password matches
            if (passwordCompare) {
                let roleSpecificData;

                // Handle different roles
                if (user.role === 'SuperUser') {
                    roleSpecificData = {
                        id: user._id,
                        role: 'SuperUser',
                        name:user.name
                    };
                } else if (user.role === 'Driver') {
                    roleSpecificData = {
                        id: user._id,
                        role: 'Driver',
                        name: user.name
                    };
                } else {
                    roleSpecificData = {
                        id: user._id,
                        role: 'Passenger',
                        name: user.name
                    };
                }

                const data = {
                    userid: user.userid,
                    user: roleSpecificData,
                };

                // If user is verified, generate a JWT token
               
                    const authToken = jwt.sign(data, process.env.JWT_Token, { expiresIn: '1d' });
                    return res.status(200).json({ success: true, authToken,message:'Log In Successfully' });
               
            } else {
                // If password doesn't match
                return res.status(400).json({ success: false, message: "Incorrect password" });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    }
);


export default router;