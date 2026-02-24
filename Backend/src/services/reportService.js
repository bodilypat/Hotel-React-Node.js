//src/services/report.service.js 

const db = require('../config/db');

exports.getRevenue = async (startDate, endDate) => {
    const [[result]] = await db.query(
        `SELECT SUM(amount) as total_revenue
         FROM payments
         WHERE payment_date BETWEEN ? AND ?`,
        [startDate, endDate]
    );
    return result.total_revenue || 0;
};

exports.getOccupancy = async (startDate, endDate) => {
    const [[totalRooms]] = await db.query(
        `SELECT COUNT(*) as total_rooms FROM rooms`
    );

    const [[occupiedRooms]] = await db.query(
        "SELECT COUNT(*) as occupied FROM rooms WHERE status = 'occupied' AND (check_in_date <= ? AND check_out_date >= ?)",
        [endDate, startDate]
    );

    const rate = totalRooms.total === 0 
        ? 0
        : ((occupiedRooms.occupied / totalRooms.total) * 100).toFixed(2);

        return {
        totalRooms: totalRooms.total,
        occupiedRooms: occupiedRooms.occupied,
        occupancyRate: rate
    };
};
