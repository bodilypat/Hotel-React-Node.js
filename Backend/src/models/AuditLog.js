//models/AuditLog.js 

const mongoose = require('mongoose');
const auditLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    log_date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('AuditLog', auditLogSchema);
