//src/models/room.model.js 

const db = require('../config/db');

exports.createRoom = (roomData) => {
    const { username, type, price, status } = roomData;

    const [result] = db.query(
        'INSERT INTO rooms (username, type, price, status) VALUES (?, ?, ?, ?)',
        [username, type, price, status]
    );

    return result.insertId;
};

exports.findRoomById = (id) => {
    const [rows] = db.query('SELECT * FROM rooms WHERE id = ?', [id]);
    return rows[0];
};

exports.updateRoom = (id, roomData) => {
    const { username, type, price, status } = roomData;

    db.query(
        'UPDATE rooms SET username = ?, type = ?, price = ?, status = ? WHERE id = ?',
        [username, type, price, status, id]
    );
};

exports.deleteRoom = (id) => {
    db.query('DELETE FROM rooms WHERE id = ?', [id]);
};

exports.findAllRooms = () => {
    const [rows] = db.query('SELECT * FROM rooms');
    return rows;
};

exports.findRoomsByStatus = (status) => {
    const [rows] = db.query('SELECT * FROM rooms WHERE status = ?', [status]);
    return rows;
};

exports.findRoomsByType = (type) => {
    const [rows] = db.query('SELECT * FROM rooms WHERE type = ?', [type]);
    return rows;
};

