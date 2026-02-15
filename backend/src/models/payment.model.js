//src/models/payment.model.js 

const db = require('../config/db');

exports.createPayment = async (paymentData) => {
    const { boking_id, amount, payment_method, payment_status } = paymentData;

    const [result] = await db.query(
        'INSERT INTO payments (boking_id, amount, payment_method, payment_status) VALUES (?, ?, ?, ?)',
        [boking_id, amount, payment_method, payment_status]
    );

    return result.insertId;
};

exports.findPaymentById = async (paymentId) => {
    const [rows] = await db.query('SELECT * FROM payments WHERE id = ?', [paymentId]);
    return rows[0];
};

exports.updatePaymentStatus = async (paymentId, status) => {
    await db.query('UPDATE payments SET payment_status = ? WHERE id = ?', [status, paymentId]);
};

exports.deletePayment = async (paymentId) => {
    await db.query('DELETE FROM payments WHERE id = ?', [paymentId]);
};

exports.getAllPayments = async () => {
    const [rows] = await db.query('SELECT * FROM payments');
    return rows;
};

