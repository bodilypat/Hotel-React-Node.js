// src/middleware/authMiddleware.js


const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* ----------- Verify JWT Token Middleware ----------- */
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or malformed' });
        }

        const token = authHeader.split(' ')[1];

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = {
            id: user._id,
            role: user.role,
            email: user.email
        };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* 
**  Role Authentication Middleware
**  Usage: authorize(['admin']) or authorize(['admin', 'user'])
 */
const authorize = (roles = [] ) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    authorize
};

