// server/routes/products.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // We will create this middleware
const Product = require('../models/Product');
const User = require('../models/User');

// @route   GET api/products
// @desc    Get all available products with optional filters
router.get('/', async (req, res) => {
    try {
        const { category, condition, for: forType, search } = req.query;
        
        // Build filter object
        const filter = { availabilityStatus: 'Available' };
        if (category) filter.category = category;
        if (condition) filter.condition = condition;
        if (forType) filter.for = forType;
        if (search) filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search

        const products = await Product.find(filter).populate('seller', 'name collegeName');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/products/:id
// @desc    Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'name collegeName');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/products
// @desc    Add a new product
router.post('/', auth, async (req, res) => {
    const { name, description, price, category, condition, for: forType, images } = req.body;

    try {
        // Check if user is a seller
        const user = await User.findById(req.user.id);
        if (!user.isSeller) {
            return res.status(403).json({ msg: 'Access Denied: You must be a seller to add products.' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            condition,
            for: forType,
            images,
            seller: req.user.id
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/products/:id
// @desc    Update a product
router.put('/:id', auth, async (req, res) => {
    const { name, description, price, category, condition, for: forType, images, availabilityStatus } = req.body;

    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Verify that the logged-in user is the owner of the product
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized to update this product' });
        }

        // Build update object
        const updateFields = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (category) updateFields.category = category;
        if (condition) updateFields.condition = condition;
        if (forType) updateFields.for = forType;
        if (images) updateFields.images = images;
        if (availabilityStatus) updateFields.availabilityStatus = availabilityStatus;

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Verify that the logged-in user is the owner of the product
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized to delete this product' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;