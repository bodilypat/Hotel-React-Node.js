//models/Guest.js 

const mongoose = require('mongoose');
const guestSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String
    },
    id_proof_type: {
        type: String,
        enum: ['passport', 'driver_license', 'national_id'],
        required: true
    },
    id_proof_number: {
        type: String,
        required: true  
    },
}, { timestamps: true });

module.exports = mongoose.model('Guest', guestSchema);


