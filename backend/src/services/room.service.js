//src/services/room.service.js 

const db = require('../config/db');

exports.createRoom = async (roomData) => {
    const { room_number, type, price } = roomData;

    const [result] = await db.query(
        'INSERT INTO rooms (room_number, type, price, status) VALUES (?, ?, ?, ?)',
        [room_number, type, price, 'available']
    );

    return result.insertId;
};

exports.getAvailableRooms = async () => {
    const [rows] = await db.query('SELECT * FROM rooms WHERE status = ?', ['available']);
    return rows;
};

exports.updateRoomStatus = async (roomId, status) => {
    await db.query('UPDATE rooms SET status = ? WHERE id = ?', [status, roomId]);
};

exports.getRoomById = async (roomId) => {
    const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [roomId]);
    return rows[0];
};

exports.deleteRoom = async (roomId) => {
    await db.query('DELETE FROM rooms WHERE id = ?', [roomId]);
};

