//src/controllers/room.controller.js 

const db = require('../config/db');

/* Create Room (Admin)
** Only Admins can create rooms
*/
exports.createRoom = async (req, res) => {
    const { room_number, type, price, status } = req.body;

    if (!room_number || !type || !price) {
        return res.status(400).json({ message: 'Room number, type, and price are required' });
    }

    try {
        const [existing] = await db.query(
            'SELECT * FROM rooms WHERE room_number = ?',
                [room_number]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'Room number already exists' });
        }

        const [result] = await db.query(
            'INSERT INTO rooms (room_number, type, price, status) VALUES (?, ?, ?, ?)',
            [room_number, type, price, status || 'available']
        );

        res.status(201).json({ 
            message: 'Room created successfully', 
            roomId: result.insertId 
        });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Get All Rooms (filter + pagination)
** Any user can view rooms
*/
exports.getRooms = async (req, res) => {
    try {
        let query = 'SELECT * FROM rooms WHERE 1=1';
        let countQuery = 'SELECT COUNT(*) as total FROM rooms WHERE 1=1';
        const params = [];

        // Filtering
        if (req.query.type) {
            query += ' AND type = ?';
            countQuery += ' AND type = ?';
            params.push(req.query.type);
        }

        if (req.query.status) {
            query += ' AND status = ?';
            countQuery += ' AND status = ?';
            params.push(req.query.status);
        }

        if (req.query.min_price) {
            query += ' AND price >= ?';
            countQuery += ' AND price >= ?';
            params.push(req.query.min_price);
        }

        if (req.query.max_price) {
            query += ' AND price <= ?';
            countQuery += ' AND price <= ?';
            params.push(req.query.max_price);
        }
        
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        query += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [rooms] = await db.query(query, params);
        const [[{ total }]] = await db.query(countQuery, params);

        res.status(200).json({ 
            rooms, 
            total, 
            page, 
            limit,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Get Room by ID
** Any user can view room details
*/
exports.getRoomById = async (req, res) => {
    try {
        const [rooms] = await db.query(
            'SELECT * FROM rooms WHERE id = ?',
            [req.params.id]
        );

        if (rooms.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json(rooms[0]);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Update Room (Admin)
** Only Admins can update rooms
*/
exports.updateRoom = async (req, res) => {
    const { room_number, type, price, status } = req.body;

    try {
        const [existing] = await db.query(
            'SELECT * FROM rooms WHERE id = ?',
            [req.params.id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await db.query(
            'UPDATE rooms SET room_number = ?, type = ?, price = ?, status = ? WHERE id = ?',
            [
                room_number || existing[0].room_number,
                type || existing[0].type,
                price || existing[0].price,
                status || existing[0].status,
                req.params.id
            ]
        );

        res.status(200).json({ message: 'Room updated successfully' });
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Update Room Status (PATCH) */
exports.updateRoomStatus = async (req, res) => {
    const { status } = req.body;

    const allowedStatuses = ['available', 'occupied', 'maintenance'];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const [existing] = await db.query(
            'SELECT * FROM rooms WHERE id = ?',
            [req.params.id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await db.query(
            'UPDATE rooms SET status = ? WHERE id = ?',
            [status, req.params.id]
        );

        res.status(200).json({ message: 'Room status updated successfully' });
    } catch (error) {
        console.error('Error updating room status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/* Delete Room (Prevent if Occupied) */
exports.deleteRoom = async (req, res) => {
    try {
        const [existing] = await db.query(
            'SELECT * FROM rooms WHERE id = ?',
            [req.params.id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (existing[0].status === 'occupied') {
            return res.status(400).json({ message: 'Cannot delete an occupied room' });
        }

        // Hard delete (can convert to soft delete if needed)
        await db.query(
            'DELETE FROM rooms WHERE id = ?',
            [req.params.id]
        );

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

