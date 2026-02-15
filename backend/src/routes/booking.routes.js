//src/routes/booking.routes.js 

const router = require('express').Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

/* Create a new booking 
** Guest and Receptions can book rooms
 */
router.post(
        '/',
        verifyToken,
        authorize(['Guest', 'Reception']),
        bookingController.createBooking
);

/* 
** Get all bookings 
** Admin: all bookings 
** Receptionist: all bookings 
** Guest: own bookings only 
** Optional query params: status, check_in, check_out, user_id 
 */
router.get(
        '/',
        verifyToken,
        authorize(['Admin', 'Reception', 'Guest']),
        bookingController.getBookings
);

/* 
** Get booking by ID 
** Admin: all bookings
** Receptionist: all bookings
** Guest: only own booking
 */
router.get(
        '/:id',
        verifyToken,
        authorize(['Admin', 'Reception', 'Guest']),
        bookingController.getBookingById
);

/*
** Update booking by ID
** Admin: all bookings
** Receptionist: can update bookings
** Guest: only cancel own bookings (status change to 'Cancelled')
*/
router.put(
        '/:id',
        verifyToken,
        authorize(['Admin', 'Reception', 'Guest']),
        bookingController.updateBooking
);

/* Delete/cancel booking by ID
** Admin: all bookings
** Receptionist: can delete bookings
** Guest: can cancel own bookings 
*/
router.delete(
        '/:id',
        verifyToken,
        authorize(['Admin', 'Reception', 'Guest']),
        bookingController.deleteBooking
);

module.exports = router;



