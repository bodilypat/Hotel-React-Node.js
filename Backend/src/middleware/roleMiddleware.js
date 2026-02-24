//src/middleware/roleMiddleware.js 
/* 
** Role-based Authentication Middleware
** Usage:
** authorize(['admin']) 
** authorize(['admin', 'manager'])
 */

const authorize = (allowedRoles = [] ) => {
    return (req, res, next) => {
        try {
            // Make sure exists (verifyToken should have run before this)
            if (!req.user || !req.user.role) {
                return res.status(403).json({ message: 'Access denied: No user role found' });
            }

            // if no roles specified, allow access
            if (allowedRoles.length === 0) {
                return next();
            }

            // Check if user's role is included 
            if (allowedRoles.includes(req.user.role)) {
                return next();
            } else {
                return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
            }
        } catch (error) {
            console.error('Authorization error:', error);
            return res.status(500).json({ message: 'Server error during authorization' });
        }
    };
};

module.exports = authorize;

