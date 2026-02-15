//src/routes/auth.routes.js 

const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/* Authentication Routes */

// Login 
router.post('/login', authController.login);

// Refresh Access Token 
router.post('/refresh-token', authController.refreshToken);

// Logout (invalidate refresh token)
router.post('/logout', verifyToken, authController.logout);

// Verify Token (Check session validity)
router.get('/verify-token', verifyToken, authController.verifyToken);

/* Password Recorvery Routes */

// Forgot Password (send reset link  token)
router.post('/forgot-password', authController.forgotPassword);

// Reset Password 
router.post('/reset-password', authController.resetPassword);

module.exports = router;
