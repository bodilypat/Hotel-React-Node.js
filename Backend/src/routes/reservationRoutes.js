//routes/reservation.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');

router.post('/', auth.authenticate, auth.authorize(['Receptionist', 'admin']), reservationController.createReservation);
router.get('/', auth.authenticate, auth.authorize(['Receptionist','Manager','admin']), reservationController.getReservations);

module.exports = router;

