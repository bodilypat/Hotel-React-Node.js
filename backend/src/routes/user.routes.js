//src/routes/user.routes.js 

const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/authJwt');
const { auhorize } = require('../middlewares/auth.middleware');

/* Public Routes */

// Register new user (Guest by default)
router.post('/register', userController.registerUser);

// Login handled separately (auth.routes.js normally)
// router.post('/login', userController.loginUser);

/* Authenticated User Routes */

// Get Logged-in User Profile
router.get(
        '/profile',
        verifyToken,
        auhorize(['user', 'admin']),
        userController.getProfile
);

// Update own profile
router.put(
        '/profile',
        verifyToken,
        auhorize(['user', 'admin']),
        userController.updateProfile
);

// Change Password
router.patch(
        '/change-password',
        verifyToken,
        auhorize(['user', 'admin']),
        userController.changePassword
);

/* Admin User Management 
** Get all users (filter + pagination supported)
*/
router.get(
        '/',
        verifyToken,
        auhorize(['admin']),
        userController.getAllUsers
);

// Get user by ID
router.get(
        '/:id',
        verifyToken,
        auhorize(['admin']),
        userController.getUserById
);

// Update user (role / status change )
router.put(
        '/:id',
        verifyToken,
        auhorize(['admin']),
        userController.updateUser
);

// Soft delete / deactivate user
router.delete(
        '/:id',
        verifyToken,
        auhorize(['admin']),
        userController.deactivateUser
);

module.exports = router;

