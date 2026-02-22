//src/models/Room.js 

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_number: {
        type: String,
        required: true,
        unique: true,
    },
    room_type: {
        type: String,
        enum: ["Single", "Double", "Suite", "Deluxe","Family"],
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    price_per_night: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["Available", "Occupied", "Cleaning", "Maintenance"],
        default: "Available",
    },      
    amenities: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
        default: "",
    },
    images: {
        type: [String],
        default: [],
    },
}, { timestamps: true });   

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
