//src/models/auth.model.js 

const db = require('../config/db');

exports.findUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

exports.storeRefreshToken = async (userId, token) => {
    await db.execute('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)', [userId, token]);
};

exports.findRefreshToken = async (token) => {
    const [rows] = await db.execute('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
    return rows[0];
};

exports.deleteRefreshToken = async (token) => {
    await db.execute('DELETE FROM refresh_tokens WHERE token = ?', [token]);
};

exports.savePasswordResetToken = async (userId, token) => {
    await db.execute('INSERT INTO password_reset_tokens (user_id, token) VALUES (?, ?)', [userId, token]);
};

exports.findPasswordResetToken = async (token) => {
    const [rows] = await db.execute('SELECT * FROM password_reset_tokens WHERE token = ?', [token]);
    return rows[0];
};

exports.deletePasswordResetToken = async (token) => {
    await db.execute('DELETE FROM password_reset_tokens WHERE token = ?', [token]);
};

