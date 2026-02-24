//models/User.js 

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'Receptionist','Housekeeping','Manager'], 
        required: true
    },
}, { timestamps: true });

// Method to set password
userSchema.methods.setPassword = async function(password) {
    this.password_hash = await bcrypt.hash(password, 10);
};

// Method to validate password
userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
};

module.exports = mongoose.model('User', userSchema);

