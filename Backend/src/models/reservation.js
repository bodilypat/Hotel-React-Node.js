//src/models/Reservation.js 

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    guest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
        required: true,
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    check_in_date: {
        type: Date,
        required: true,
    },
    check_out_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'checked_in', 'checked_out', 'cancelled'],
        default: 'booked',
    },
    total_amount: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
