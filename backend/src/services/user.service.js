//src/services/user.service.js 

const db = require('../configd/b');
const bcrypt = require('bcryptjs');

exports.createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
        'INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, 'guest', 'active']
    );

    return result.insertId;
};

exports.getUserById = async (id) => {
    const [rows] = await db.query('SELECT id, username, email, role, status FROM users WHERE id = ?', [id]);
    return rows[0];
};

exports.getUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT id, username, email, role, status FROM users');
    return rows;
};

exports.updateUser = async (id, username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
        [username, email, hashedPassword, id]
    );
};

exports.deleteUser = async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
};

exports.updateUserRole = async (id, role) => {
    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
};

exports.updateUserStatus = async (id, status) => {
    await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
};

exports.authenticateUser = async (email, password) => {
    const user = await this.getUserByEmail(email);
    if (!user) {
        return null;
    }   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
};

