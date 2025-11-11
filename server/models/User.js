const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    collegeName: { type: String, required: true },
    collegeCountry: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    collegeEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    collegeIdPhoto: { type: String },
    upiId: { type: String }
});

module.exports = mongoose.model('User', UserSchema);