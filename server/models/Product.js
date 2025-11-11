// server/models/Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
        required: true
    },
    for: {
        type: String,
        enum: ['Buy', 'Borrow'],
        required: true
    },
    images: [{
        type: String
    }],
    availabilityStatus: {
        type: String,
        default: 'Available'
    }
});

module.exports = mongoose.model('Product', ProductSchema);