//src/controllers/payment.controller.js 

const db = require('../config/db');

/* 
** Create Payment 
** Guest: can pay for own booking 
** Receptionist: can record payment 
** Admin: full access 
** POST /api/payments
*/
exports.createPayment = async (req, res) => {
    const { booking_id, amount, payment_method } = req.body;

    if (!booking_id || !amount || !payment_method) {
        return res.status(400).json({ message: 'Booking ID, amount, and payment method are required' });
    }

    try {
        //check if booking exists
        const booking = await db.query('SELECT * FROM bookings WHERE id = $1', [booking_id]);
        if (booking.rows.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        //check if user is guest and owns the booking
        if (req.user.role === 'guest' && booking.rows[0].guest_id !== req.user.id) {
            return res.status(403).json({ message: 'Guests can only pay for their own bookings' });
        }

        // Prevent duplicate completed payment 
        const [existingPayment] = await db.query(
            "SELECT * FROM payments WHERE booking_id = ? AND payment_status = 'completed'",
            [booking_id]
        );

        if (existingPayment.length > 0) {
            return res.status(400).json({ message: 'Payment has already been completed for this booking' });
        }

        // Create payment 
        const [result] = await db.query(
            'INSERT INTO payments (booking_id, amount, payment_method, payment_status) VALUES (?, ?, ?, ?) RETURNING *',
            [booking_id, amount, payment_method, 'completed']
        );

        // Update booking status to checked_in (optional logic)
        await db.query(
            'UPDATE bookings SET status = ? WHERE id = ?',
                ['checked_in', booking_id]
        );

        res.status(201).json({ message: 'Payment successful', payment: result[0] });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Get Payments (with filtering + pagination)
** GET /api/payments
** Admin: can view all payments
** Receptionist: can view all payments
** Guest: can view own payments
*/
exports.getPayments = async (req, res) => {
    try {
        let query = '
            SELECT p.*, b.room_id, b.check_in_date, b.check_out_date
            FROM payments p
            JOIN bookings b ON p.booking_id = b.id
            WHERE 1=1
        ';
        const params = [];

        // Guests see only their payments
        if (req.user.role === 'guest') {
            query += ' AND b.guest_id = ?';
            params.push(req.user.id);
        }

        // Optional filters
        if (req.query.booking_id) {
            query += ' AND p.booking_id = ?';
            params.push(req.query.booking_id);
        }

        if (req.query.payment_method) {
            query += ' AND p.payment_method = ?';
            params.push(req.query.payment_method);
        }

        if (req.query.payment_status) {
            query += ' AND p.payment_status = ?';
            params.push(req.query.payment_status);
        }
        
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [payments] = await db.query(query, params);

        res.json({ 
            payments, 
            page, 
            limit
        });
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Get Payment by ID
** GET /api/payments/:id
** Admin: can view any payment
** Receptionist: can view any payment
** Guest: can view own payments
*/
exports.getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const [payments] = await db.query(
            `SELECT p.*, b.room_id, b.check_in_date, b.check_out_date 
             FROM payments p JOIN bookings b ON p.booking_id = b.id 
             WHERE p.id = ?`,
            [id]
        );

        if (payments.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        const payment = payments[0];

        // Guests can only view their own payments
        if (req.user.role === 'guest' && payment.guest_id !== req.user.id) {
            return res.status(403).json({ message: 'Guests can only view their own payments' });
        }
        res.json(payment);
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Update Payment Status (Admin / Receptionist)
** PATCH /api/payments/:id
** Admin: can update any payment
** Receptionist: can update any payment
*/
exports.updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { payment_status } = req.body;

    if (!['pending', 'completed', 'failed'].includes(payment_status)) {
        return res.status(400).json({ message: 'Invalid payment status' });
    }

    try {
        const [result] = await db.query(
            'UPDATE payments SET payment_status = ? WHERE id = ? RETURNING *',
            [payment_status, id]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json({ message: 'Payment status updated', payment: result[0] });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Delete Payment (Admin only)
** DELETE /api/payments/:id
** Admin: can delete any payment
*/
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM payments WHERE id = ? RETURNING *', [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

