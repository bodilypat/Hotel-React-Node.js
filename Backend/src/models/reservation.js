//models/Reservation.js

const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    check_in_date: {
        type: Date,
        required: true
    },
    check_out_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Checked-in', 'Check-out', 'Cancelled'],
        default: 'Booked'
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);

