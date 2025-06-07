const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            console.log(user.password, ' ', password);

            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(user.email);
        res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

