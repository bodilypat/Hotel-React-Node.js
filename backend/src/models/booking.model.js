//src/models/booking.model.js 

const db = require('../config/db');

exports.createBooking = async (bookingData) => {
    const { userId, roomId, check_in, check_out, status} = bookingData;

    const [result] = await db.query(
        'INSERT INTO bookings (user_id, room_id, check_in, check_out, status) VALUES (?, ?, ?, ?, ?)',
        [userId, roomId, check_in, check_out, status]
    );

    return result.insertId;
};

exports.findBookingById = async (bookingId) => {
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [bookingId]);
    return rows[0];
};

exports.updateBookingStatus = async (bookingId, status) => {
    await db.query('UPDATE bookings SET status = ? WHERE id = ?', [status, bookingId]);
    return true;
};

exports.deleteBooking = async (bookingId) => {
    await db.query('DELETE FROM bookings WHERE id = ?', [bookingId]);
    return true;
};

exports.getBookingsByUserId = async (userId) => {
    const [rows] = await db.query('SELECT * FROM bookings WHERE user_id = ?', [userId]);
    return rows;
};

exports.getAllBookings = async () => {
    const [rows] = await db.query('SELECT * FROM bookings');
    return rows;
};

