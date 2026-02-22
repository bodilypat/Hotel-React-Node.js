//src/models/Payment.js 

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    payment_method: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Cash', 'Online'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
}, { timestamps: true });

// Index for faster status search
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);

