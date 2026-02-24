//routes/paymentRoutes.js 

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth.authenticate, auth.authorize(['Receptionist', 'admin']), paymentController.createPayment);
router.get('/', auth.authenticate, auth.authorize(['Receptionist', 'Manager', 'admin']), paymentController.getPayments);

module.exports = router;

