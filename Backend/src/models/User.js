//src/models/User.js 

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    },
    password_hash: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    user_role: {
        type: String,
        enum: ['Admin', 'Receptionist','Housekeeping', 'Manager'],
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
