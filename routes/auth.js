const express = require('express');
const router = express.Router();
const db = require('../db');

// Register a new user
router.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Add logic to register the user in the database
        const newUser = await db.createUser(username, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login a user
router.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Add logic to authenticate the user
        const user = await db.authenticateUser(username, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Get the authenticated user's details
router.get('/api/auth/me', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        // Fetch user details from the database
        const user = await db.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});

module.exports = router;
