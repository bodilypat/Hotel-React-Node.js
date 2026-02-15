//src/services/booking.service.js 

const db = require('../config/db');

exports.createBooking = async (userId, roomId, checkIn, checkOut) => {
    const [result] = await db.query(
        'INSERT INTO bookings (user_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)',
        [userId, roomId, checkIn, checkOut]
    );
    return result.insertId;
};

exports.getBookingsByUserId = async (userId) => {
    const [rows] = await db.query(
        'SELECT * FROM bookings WHERE user_id = ?',
        [userId]
    );
    return rows;
};

exports.getBookingById = async (bookingId) => {
    const [rows] = await db.query(
        'SELECT * FROM bookings WHERE id = ?',
        [bookingId]
    );
    return rows[0];
};

exports.updateBooking = async (bookingId, checkIn, checkOut) => {
    await db.query(
        'UPDATE bookings SET check_in = ?, check_out = ? WHERE id = ?',
        [checkIn, checkOut, bookingId]
    );
};

exports.deleteBooking = async (bookingId) => {
    await db.query(
        'DELETE FROM bookings WHERE id = ?',
        [bookingId]
    );
};

exports.getAllBookings = async () => {
    const [rows] = await db.query('SELECT * FROM bookings');
    return rows;
};

exports.getBookingsByRoomId = async (roomId) => {
    const [rows] = await db.query(
        'SELECT * FROM bookings WHERE room_id = ?',
        [roomId]
    );
    return rows;
};

exports.getBookingsByDateRange = async (startDate, endDate) => {
    const [rows] = await db.query(
        'SELECT * FROM bookings WHERE (check_in <= ? AND check_out >= ?) OR (check_in >= ? AND check_out <= ?)',
        [endDate, startDate, startDate, endDate]
    );
    return rows;
};

exports.getBookingsWithUserDetails = async () => {
    const [rows] = await db.query(
        'SELECT b.*, u.name AS user_name, u.email AS user_email FROM bookings b JOIN users u ON b.user_id = u.id'
    );
    return rows;
};

exports.getBookingsWithRoomDetails = async () => {
    const [rows] = await db.query(
        'SELECT b.*, r.name AS room_name, r.type AS room_type FROM bookings b JOIN rooms r ON b.room_id = r.id'
    );
    return rows;
};

