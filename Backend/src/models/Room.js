//models/Room.js

const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    room_number: {
        type: String,
        required: true,
        unique: true
    },
    room_type: {
        type: String,
        enum: ['single', 'double', 'suite'],
        required: true
    },
    price_per_night: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'maintenance'],
        default: 'available'
    },
    amenities: [String]
}, { timestamps: true});

module.exports = mongoose.model('Room', roomSchema);

