//middleware/auditMiddleware.js 

const Audit = require('../models/AuditLog');

exports.logAction = async (req, res, next) => {
    try {
        if (req.user) {
            await Audit.create({
                user: req.user._id,
                action: `${req.method} ${req.originalUrl}`
            });
        }
        next();
    } catch (err) {
        console.error('Error logging action:', err);
        next();
    }
};

