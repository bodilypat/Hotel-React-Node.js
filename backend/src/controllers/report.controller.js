//src/controllers/report.controller.js 

const db = require('../config/db');

/* 
** Revenue Report 
** Calculates total revenue within optional date range 
*/
exports.getRevenueReport = async (req, res) => {
    const { start, end } = req.query;

    try {
        let query = `
            SELECT
                COUNT(*) as total_transaction,
                SUM(total_price) as total_revenue
            FROM payments
            WHERE payment_status = 'completed'
            `;

            const params = [];

        if (start && end) {
            query += ` AND created_at BETWEEN ? AND ?`;
            params.push(start, end);
        }

        const [result] = await db.execute(query, params);

        res.json({
            total_transaction: result[0].total_transaction || 0,
            total_revenue: result[0].total_revenue || 0
        });

    } catch (error) {
        console.error('Error fetching revenue report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* 
** Occupancy Report 
** Calculates occupancy percentage 
*/
exports.getOccupancyReport = async (req, res) => {
    try {
        const [[totalRooms]] = await db.query(`SELECT COUNT(*) as count FROM rooms`);

        const [[occupiedRooms]] = await db.query(`
            SELECT COUNT(*) as occupied FROM rooms WHERE status = 'occupied'
        `);

        const occupancyRate = totalRooms.total === 0 
            ? 0
            : ((occupiedRooms.occupied / totalRooms.count) * 100).toFixed(2);

        res.json({
            total_rooms: totalRooms.count,
            occupied_rooms: occupiedRooms.occupied,
            occupancy_rate: occupancyRate
        });
    } catch (error) {
        console.error('Error fetching occupancy report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* 
** Booking Report 
** Returns booking count grouped by status
*/
exports.getBookingReport = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT booking_status, COUNT(*) as count
            FROM bookings
            GROUP BY booking_status
        `);

        res.json(result);

    } catch (error) {
        console.error('Error fetching booking report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* 
** User Report 
** Returns user count grouped by role and status 
*/
exports.getUserReport = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT role, status, COUNT(*) as count
            FROM users
            GROUP BY role, status
        `);

        res.json(result);

    } catch (error) {
        console.error('Error fetching user report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* Dashboard Report 
** Returns quick overview for admin dashboard 
*/
exports.getDashboardSummary = async (req, res) => {
    try {
        const [[totalUsers]] = await db.query(`SELECT COUNT(*) as count FROM users WHERE status = 'active'`);

        const [[totalRooms]] = await db.query(`SELECT COUNT(*) as count FROM rooms`);

        const [[availableRooms]] = await db.query(`SELECT COUNT(*) as count FROM rooms WHERE status = 'available'`);

        const [[pendingBookings]] = await db.query(`SELECT COUNT(*) as count FROM bookings WHERE booking_status = 'pending'`);

        const [[totalRevenue]] = await db.query(`SELECT SUM(total_price) as total FROM payments WHERE payment_status = 'completed'`);

        res.json({
            total_users: totalUsers.count || 0,
            total_rooms: totalRooms.count || 0,
            available_rooms: availableRooms.count || 0,
            pending_bookings: pendingBookings.count || 0,
            total_revenue: totalRevenue.total || 0
        });
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

