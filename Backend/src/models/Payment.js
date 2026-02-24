//models/Payment.js 

const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    payment_method: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Cash', 'Bank Transfer'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    }
});
module.exports = mongoose.model('Payment', PaymentSchema);


