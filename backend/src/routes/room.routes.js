//src/routes/room.routes.js 
const router = require('express').Router();
const roomController = require('../controllers/room.controller');
const { verifyToken } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/role.middleware');

/*  Public / Authenticate Room Views
** All authenticated users can view rooms
** Guests can view only.
** Admins can view all rooms.
*/
router.get(
        '/', 
        verifyToken, 
        roomController.getAllRooms
);

/* Get available rooms only (shortcut endpoint) */
router.get(
    '/available',
    verifyToken,
    roomController.getAvailableRooms
);

/* Get room by ID
** All authenticated users can view a room by ID
*/
router.get(
    '/:id',
    verifyToken,
    roomController.getRoomById
);

/* Create a new room
** Only Admins can create rooms
*/
router.post(
    '/',
    verifyToken,
    authorize('admin'),
    roomController.createRoom
);

/* Update a room by ID
** Only Admins can update rooms
*/
router.put(
    '/:id',
    verifyToken,
    authorize('admin'),
    roomController.updateRoom
);

/* Delete a room by ID
** Only Admins can delete rooms
*/
router.delete(
    '/:id',
    verifyToken,
    authorize('admin'),
    roomController.deleteRoom
);

module.exports = router;
