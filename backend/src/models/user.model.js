//src/models/user.model.js 

const db = require('../config/db');

exports.createUser = async (userData) => {
    const { username, email, password, role="guest", status="active" } = userData;

    const [result] = await db.query(
        'INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
        [username, email, password, role, status]
    );
    return result.insertId;
};

exports.findUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

exports.findAllUsers = async () => {
    const [rows] = await db.query('SELECT id, username, email, role, status FROM users');
    return rows;
};

exports.updateUser = async (id, userData) => {
    const { username, email, password, role, status } = userData;
    await db.query(
        'UPDATE users SET username = ?, email = ?, password = ?, role = ?, status = ? WHERE id = ?',
        [username, email, password, role, status, id]
    );
};

exports.deleteUser = async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
};

exports.findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

exports.updateUserStatus = async (id, status) => {
    await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
};

exports.updateUserRole = async (id, role) => {
    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
};


