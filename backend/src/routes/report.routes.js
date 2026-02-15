//src/routes/report.routes.js 

const router = require('express').Router();
const reportController = require('../controllers/report.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

/* Reports Routes 
** All report endpoint require:
** - Valid JWT 
** - Admin role
*/


/* 
** Revenue Reports 
** GET/api/reports/revenue?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
*/
router.get(
        '/reports/revenue',
        verifyToken,
        authorize('admin'),
        reportController.getRevenueReport
);

/* Occupancy Reports 
** GET/api/reports/occupancy?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
*/
router.get(
        '/reports/occupancy',
        verifyToken,
        authorize('admin'),
        reportController.getOccupancyReport
);

/* Booking Summary Reports 
** GET/api/reports/bookings?status=confirmed
*/
router.get(
        '/reports/bookings',
        verifyToken,
        authorize('admin'),
        reportController.getBookingSummary
);

/* Payment Summary Reports
** GET/api/reports/payments?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
*/
router.get(
        '/reports/payments',
        verifyToken,
        authorize('admin'),
        reportController.getPaymentSummary
);

/* User Statistic Reports
** GET/api/reports/users?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
*/
router.get(
        '/reports/users',
        verifyToken,
        authorize('admin'),
        reportController.getUserStatistics
);

/* Dashboard Summary (Quick Overview)
** Returns: 
** - Total revenue 
** - Total bookings
** - Active users
** - Available rooms
*/
router.get(
        '/reports/dashboard',
        verifyToken,
        authorize('admin'),
        reportController.getDashboardSummary
);

module.exports = router;
