//src/routes/userRoutes.js 

const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

/* ------------ Public Routes ------------ */
// Register new user (Guest by default)
router.post('/register', userController.registerUser);

// login is handled separately (usually in authRoutes.js)

/* ------------ Authenticated User Routes ------------ */

/* 
** @route GET /users/profile
** @desc Get current user's profile
** @access Authenticated users (user, admin)
*/
router.get('/profile', verifyToken, authorize(['user', 'admin']), userController.getUserProfile);

/* 
** @route PUT /users/profile
** @desc Update Loggedin user's profile
** @access Authenticated users (user, admin)
*/
router.put('/profile', verifyToken, authorize(['user', 'admin']), userController.updateUserProfile);

/* 
** @route PATCH /users/change-password
** @desc Change password for logged-in user
** @access Authenticated users (user, admin)
*/
router.patch('/change-password', verifyToken, authorize(['user', 'admin']), userController.changePassword);

/* ------------ Admin User Managemet ------------ */
/* 
** @route GET /users
** @desc Get all users (supports fillters & pagination)
** @access Admin only
*/
router.get('/', verifyToken, authorize(['admin']), userController.getAllUsers);

/* 
** @route GET /users/:id
** @desc Get user by ID 
** @access Admin only
*/
router.get('/:id', verifyToken, authorize(['admin']), userController.getUserById);

/* 
** @route PUT /users/:id
** @desc Update user (role/status)
** @access Admin only
*/
router.put('/:id', verifyToken, authorize(['admin']), userController.updateUserByAdmin);

/* 
** @route DELETE /users/:id
** @desc soft delete / deactivate user
** @access Admin only
*/
router.delete('/:id', verifyToken, authorize(['admin']), userController.deactivateUser);

module.exports = router;


