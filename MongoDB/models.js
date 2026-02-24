//models.js 
const mongoose = require('mongoose');
const { Schema } = mongoose;

//============================
// 1. User Schema
//============================
const userSchema = new Schema({
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
    role: {
        type: String,
        enum: ['admin', 'receptionist', 'Housekeeper','Manager'],
        required: true
    },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

//============================
// 2. Room Schema
//============================
const roomSchema = new Schema({
    room_number: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Single', 'Double', 'Suite'],
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    price_per_night: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });
const Room = mongoose.model('Room', roomSchema);

//============================
// 3. Booking Schema
//============================
const guestSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone_number: {
        type: String,
    },
    id_proof_type: {
        type: String,
        enum: ['Passport', 'Driver License', 'National ID'],
        required: true
    },
    id_proof_number: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Guest = mongoose.model('Guest', guestSchema);
//============================
// 4. Room Service Schema
//============================
const roomServiceSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    service_name: {
        type: String,
        required: true,
    },
    service_cost: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });
const RoomService = mongoose.model('RoomService', roomServiceSchema);

//============================
// 5. Reservation Schema
const reservationSchema = new Schema({
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'Guest',
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
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
        enum: ['Booked', 'Checked-in', 'Checked-out', 'Cancelled'],
        default: 'Booked'
    },
    total_cost: {
        type: Number,
        required: true,
        min: 0
    },
    services: [{
        service: {
            type: Schema.Types.ObjectId,
            ref: 'RoomService',
        },
        service_name: String,
        service_cost: Number
    }]
}, { timestamps: true });
const Reservation = mongoose.model('Reservation', reservationSchema);

//============================
// 6. Payment Schema
//============================
const paymentSchema = new Schema({
    reservation: {
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    payment_method: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Cash', 'Online Payment'],
    },
    payment_status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    }
}, { timestamps: true });
const Payment = mongoose.model('Payment', paymentSchema);

//============================
// 7. Maintenance Request Schema
//============================
const maintenanceRequestSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    request_date: {
        type: Date,
        default: Date.now
    },
});
const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

//============================
// 8. Feedback Schema
const feedbackSchema = new Schema({
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'Guest',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    feedback_date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const Feedback = mongoose.model('Feedback', feedbackSchema);

//============================
// 9. Audit Log Schema
//============================
const auditLogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true,
        trim: true
    },
    log_date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

//============================
// Exporting all models
//============================
module.exports = {
    User,
    Room,
    Guest,
    RoomService,
    Reservation,
    Payment,
    MaintenanceRequest,
    Feedback,
    AuditLog
};

