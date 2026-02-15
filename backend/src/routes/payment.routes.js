//src/routes/payment.routes.js 

const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

/* Create Payment
** Guest: can pay for own booking 
** Receptionist: can record payment 
** Admin: full access 
** POST /api/payments
*/
router.post(
        '/',
        verifyToken,
        authorize('guest', 'receptionist', 'admin'),
        paymentController.createPayment
);

/* Get All Payments
** Admin: full access
** Receptionist: full access
** Guest: only their own payments
** GET /api/payments
*/
router.get(
        '/',
        verifyToken,
        authorize('guest', 'receptionist', 'admin'),
        paymentController.getAllPayments
);

/* 
** Get Payment by ID
** Admin: full access
** Receptionist: full access
** Guest: only their own payments
** GET /api/payments/:id
*/
router.get(
        '/:id',
        verifyToken,
        authorize('guest', 'receptionist', 'admin'),
        paymentController.getPaymentById
);

/* 
** Update Payment status 
** Admin: full access
** Receptionist: full access
** Guest: cannot update
** PUT /api/payments/:id
*/
router.put(
        '/:id',
        verifyToken,
        authorize('receptionist', 'admin'),
        paymentController.updatePaymentStatus
);

/* Delete Payment 
** Admin: full access
** Receptionist: cannot delete
** Guest: cannot delete
** DELETE /api/payments/:id
*/
router.delete(
        '/:id',
        verifyToken,
        authorize('admin'),
        paymentController.deletePayment
);

module.exports = router;
