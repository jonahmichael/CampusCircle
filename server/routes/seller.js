const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   PUT api/seller/become-seller
router.put('/become-seller', auth, async (req, res) => {
    const { upiId, collegeIdPhotoUrl } = req.body; // For now, we'll pass the URL directly
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.isSeller = true;
        user.upiId = upiId;
        user.collegeIdPhoto = collegeIdPhotoUrl; // In a real app, you'd handle file upload here
        await user.save();
        res.json({ msg: 'Congratulations! You are now a seller.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;