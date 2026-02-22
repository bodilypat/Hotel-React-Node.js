//src/models/Guest.js

const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone_number: {
        type: String,
        required: true,
        trim: true,
    },
    id_proof_type: {
        type: String,
        enum: ["Passport", "Driver's License", "National ID"],
        required: true,
    },
    id_proof_number: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Guest', guestSchema);

