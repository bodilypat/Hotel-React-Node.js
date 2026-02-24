//src/services/payment.service.js 

const db = require('../config/db');

exports.createPayment = async (bookingId, amount, method) => {
    const [result] = await db.query(
        'INSERT INTO payments (booking_id, amount, method) VALUES (?, ?, ?)',
        [bookingId, amount, method]
    );
    return result.insertId;
};

exports.getPaymentByBookingId = async (bookingId) => {
    const [rows] = await db.query(
        'SELECT * FROM payments WHERE booking_id = ?',
        [bookingId]
    );
    return rows[0];
};

exports.updatePaymentStatus = async (paymentId, status) => {
    await db.query(
        'UPDATE payments SET status = ? WHERE id = ?',
        [status, paymentId]
    );
};

exports.getPayments = async () => {
    const [rows] = await db.query('SELECT * FROM payments');
    return rows;
};

exports.deletePayment = async (paymentId) => {
    await db.query(
        'DELETE FROM payments WHERE id = ?',
        [paymentId]
    );
};
