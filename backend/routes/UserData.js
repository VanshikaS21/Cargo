import express from 'express';
import User from '../models/userSchema.js';
import { param, body, validationResult } from 'express-validator'; // Import validation functions
import isSuperAdmin from '../middleware/isSuperAdmin.js';
import fetchuser from '../middleware/fetchUser.js';

const router = express.Router();

// Get all users
router.get('/',fetchuser,isSuperAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user by ID
router.get('/:id', fetchuser, [
    param('id').isMongoId().withMessage('Invalid user ID format'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({data:user,success:true});
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user
router.put('/:id', fetchuser, [
    param('id').isMongoId().withMessage('Invalid user ID format'),
    // Add other fields and validation as necessary
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body.data;
    

    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user,success:true });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete user by ID
router.delete('/:id', fetchuser, [
    param('id').isMongoId().withMessage('Invalid user ID format'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete all users (Use with caution)
router.delete('/', fetchuser,isSuperAdmin, async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
