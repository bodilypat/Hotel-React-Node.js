//src/controllers/booking.controller.js 

const db = require('../config/db');

/* 
** Create a new booking 
** Guest & Receptions can create a bookings 
** POST /api/bookings
*/
exports.createBooking = async (req, res) => {
    const { guest_id, room_id, check_in_date, check_out_date } = req.body;
    const user_id = req.user.id; 

    if (!guest_id || !room_id || !check_in_date || !check_out_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if room exists and is available
        const [room] = await db.query(
            'SELECT * FROM rooms WHERE id = ? AND status = "available"', 
            [room_id]
        );

        if (room.length === 0) {
            return res.status(404).json({ message: 'Room not available' });
        }

        // Update room status to 'occupied'
        await db.query(
            'UPDATE rooms SET status = "occupied" WHERE id = ?', 
            [room_id]
        );

        // Create booking
        const [result] = await db.query(
            'INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date, created_by) VALUES (?, ?, ?, ?, ?)', 
            [guest_id, room_id, check_in_date, check_out_date, user_id]
        );

        // Update room status to 'occupied'
        await db.query(
            'UPDATE rooms SET status = "occupied" WHERE id = ?', 
            [room_id]
        );

        res.status(201).json({ message: 'Booking created successfully', bookingId: result.insertId });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/*
** Get all bookings
** Admin / Receptions can view all bookings
** Guest: own bookings
** Options filters: status, check_in, check_out, user_id
** Supports pagination: page & limit
** GET /api/bookings
*/
exports.getBookings = async (req, res) => {
    try {
        let query = "SELECT b.*, r.room_number, g.name AS guest_name FROM bookings b " +
                    "JOIN rooms r ON b.room_id = r.id " +
                    "JOIN guests g ON b.guest_id = g.id ";
        const params = [];
        const conditions = [];

        // Guest can only see their own bookings
        if (req.user.role === 'guest') {
            conditions.push("b.guest_id = ?");
            params.push(req.user.id);
        } else if (req.query.user_id) {
            conditions.push("b.created_by = ?");
            params.push(req.query.user_id);
        }

        if (req.query.status) {
            conditions.push("b.status = ?");
            params.push(req.query.status);
        }
        if (req.query.check_in) {
            conditions.push("b.check_in_date >= ?");
            params.push(req.query.check_in);
        }
        if (req.query.check_out) {
            conditions.push("b.check_out_date <= ?");
            params.push(req.query.check_out);
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        query += conditions.length ? "WHERE " + conditions.join(" AND ") + " " : "";
        query += "ORDER BY b.created_at DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);

        const [bookings] = await db.query(query, params);
        res.json({ bookings, page, limit });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    };

/* 
** Get booking by ID
** Guests can only access their own booking 
** GET /api/bookings/:id
*/

exports.getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const [booking] = await db.query(
            'SELECT b.*, r.room_number, g.name AS guest_name FROM bookings b ' +
            'JOIN rooms r ON b.room_id = r.id ' +
            'JOIN guests g ON b.guest_id = g.id ' +
            'WHERE b.id = ?', 
            [id]
        );

        if (booking.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const bookingData = booking[0];

        // Check if guest is trying to access their own booking
        if (req.user.role === 'guest' && bookingData.guest_id !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json(bookingData);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* 
** Update booking by ID
** Admin / Receptions can update all 
** Guests can only cancel their own booking (status = 'cancelled')
** PUT /api/bookings/:id
*/
exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const { check_in_date, check_out_date, status } = req.body;

    try {
        const [booking] = await db.query('SELECT * FROM bookings WHERE id = ?', [id]);

        if (booking.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }   

        const bookingData = booking[0];

        // Guest restrictions 
        if (req.user.role === 'guest' && bookingData.guest_id !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update booking
        const updatedStatus = status || booking.status;
        const updatedCheckIn = check_in_date || booking.check_in_date;
        const updatedCheckOut = check_out_date || booking.check_out_date;

        await db.query(
            'UPDATE bookings SET check_in_date = ?, check_out_date = ?, status = ? WHERE id = ?', 
            [updatedCheckIn, updatedCheckOut, updatedStatus, id]
        );

        // Update room status if booking status changes 
        if (status) {
            const roomStatus = (status === 'cancelled' || status === 'completed') ? 'available' : 'occupied';
            await db.query(
                'UPDATE rooms SET status = ? WHERE id = ?', 
                [roomStatus, bookingData.room_id]
            );
        }
        res.json({ message: 'Booking updated successfully' });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/*
** Delete / Cancel booking by ID
** Guests can only cancel their own booking
** Admin / Receptions can delete any booking
** DELETE /api/bookings/:id
*/
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const [booking] = await db.query('SELECT * FROM bookings WHERE id = ?', [id]);

        if (booking.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const bookingData = booking[0];

        // Guest restrictions
        if (req.user.role === 'guest' && bookingData.guest_id !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Delete booking
        await db.query('DELETE FROM bookings WHERE id = ?', [id]);

        // Update room status to 'available' 
        await db.query(
            'UPDATE rooms SET status = "available" WHERE id = ?', 
            [bookingData.room_id]
        );

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


