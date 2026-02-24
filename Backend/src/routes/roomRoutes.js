//src/routes/roomRoutes.js 

const { Router } = require('express');
const {
    createRoom,
    getAllRooms,
    getAvailableRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} = require('../controllers/roomController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = Router();

/* ------- Public Routes -------- */

/* 
** @route GET /rooms
** @desc Get all rooms
** @access Authenticated users
**     -- Admin: see all rooms
**     -- Receptionist: see all rooms
**     -- Guest / other roles : see permitted rooms only
*/  
router.get('/', verifyToken, authorize(['user', 'admin']), getAllRooms);

/* 
** @route GET /rooms/available
** @desc Get all available rooms
** @access Authenticated users
**     -- Admin: see available rooms
**     -- Receptionist: see available rooms
**     -- Guest / other roles : sees permitted rooms only
*/  

router.get('/available', verifyToken, authorize(['user', 'admin']), getAvailableRooms);

/* 
** @route GET /rooms/:id
** @desc Get room by ID
** @access Authenticated users
**     -- Admin: see any room
**     -- Receptionist: see any room
**     -- Guest / other roles : see permitted rooms only
*/
router.get('/:id', verifyToken, authorize(['user', 'admin']), getRoomById);


/* ------- Admin Routes -------- */

/* 
** @route POST /rooms/:id
** @desc Create a new room
** @access Admin only
*/
router.post('/', verifyToken, authorize(['admin']), createRoom);

/* 
** @route PUT /rooms/:id
** @desc Update a room completely
** @access Admin only
*/
router.put('/:id', verifyToken, authorize(['admin']), updateRoom);

/* 
** @route PATCH /rooms/:id
** @desc partially update a room
** @access Admin only
*/
router.patch('/:id', verifyToken, authorize(['admin']), updateRoom);

/* 
** @route DELETE /rooms/:id
** @desc Delete a room
** @access Admin only
*/
router.delete('/:id', verifyToken, authorize(['admin']), deleteRoom);

module.exports = router;
