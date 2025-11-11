const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
router.post('/register', async (req, res) => {
    const { name, dob, collegeName, collegeCountry, city, address, collegeEmail, password } = req.body;
    try {
        let user = await User.findOne({ collegeEmail });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, dob, collegeName, collegeCountry, city, address, collegeEmail, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // In a real app, you would now send a verification email.
        // For now, we'll auto-verify for simplicity.
        user.emailVerified = true;
        await user.save();


        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
    const { collegeEmail, password } = req.body;
    try {
        let user = await User.findOne({ collegeEmail });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        if (!user.emailVerified) return res.status(400).json({ msg: 'Please verify your email first' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;