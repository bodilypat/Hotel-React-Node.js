//src/controllers/user.controller.js 

const db = require('../config/db');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
const ALLOWED_ROLES = ["admin", "receptionist", "guest"];

/* Register(Public) 
** Default role is "guest" 
*/
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    try {
        const [existingUser] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const [result] = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, 'guest']
        );

        res.status(201).json({ message: 'User registered successfully.', userId: result.insertId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user.' });
    }
};

/* Get My Profile */
exports.getMyProfile = async (req, res) => {
    try {
        const [user] = await db.query(
            'SELECT id, username, email, role FROM users WHERE id = ?',
            [req.user.id]
        );
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user[0]);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile.' });
    }
};

/* Update My Profile */
exports.updateMyProfile = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const [user] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [req.user.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const updates = [];
        const params = [];
        if (username) {
            updates.push('username = ?');
            params.push(username);
        }
        if (email) {
            updates.push('email = ?');
            params.push(email);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            updates.push('password = ?');
            params.push(hashedPassword);
        }
        if (updates.length === 0) {
            return res.status(400).json({ message: 'No fields to update.' });
        }
        params.push(req.user.id);

        await db.query(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            params
        );
        res.json({ message: 'Profile updated successfully.' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile.' });
    }
};

/* Change Password */
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current password and new password are required.' });
    }

    try {
        const [user] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [req.user.id]
        );

        const existingUser = user[0];
        const isMatch = await bcrypt.compare(currentPassword, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        await db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, req.user.id]
        );

        res.json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Error changing password.' });
    }
};

/* Get All Users (Admin) 
** supports filtering + pagination 
*/
exports.getUsers = async (req, res) => {
    try {
        let query = 'SELECT id, username, email, role FROM users WHERE 1=1';
        let countQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
        const params = [];

        if (req.query.role) {
            query += ' AND role = ?';
            countQuery += ' AND role = ?';
            params.push(req.query.role);
        }

        if (req.query.search) {
            query += ' AND (username LIKE ? OR email LIKE ?)';
            countQuery += ' AND (username LIKE ? OR email LIKE ?)';
            params.push(`%${req.query.search}%`, `%${req.query.search}%`);
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;


        const [coutResult] = await db.query(countQuery, params);
        const total = coutResult[0].total;

        query += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [users] = await db.query(query, params);
        res.json({
            total,
            page,
            limit,
             users
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users.' });
    }
};

/* Get User By ID (admin) */
exports.getUserById = async (req, res) => {
    try {
        const [user] = await db.query(
            'SELECT id, username, email, role FROM users WHERE id = ?',
            [req.params.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }   
        res.json(user[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user.' });
    }
};

/* Update User (Admin Only) */
exports.updateUser = async (req, res) => {
    const { username, email, role, status } = req.body;

    try {
        const [user] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [req.params.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (role && !ALLOWED_ROLES.includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }

        await db.query(
            'UPDATE users SET username = ?, email = ?, role = ?, status = ? WHERE id = ?',
            [
                username || user[0].username, 
                email || user[0].email, 
                role || user[0].role, 
                status || user[0].status, 
                req.params.id
            ]
        );

        res.json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user.' });
    }
};

/* Update User Status (Soft Deactivate) */
exports.updateUserStatus = async (req, res) => {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be "active" or "inactive".' });
    }

    try {
        if (parseInt(req.params.id) === req.user.id) {
            return res.status(400).json({ message: 'You cannot change your own status.' });
        }

        await db.query(
            'UPDATE users SET status = ? WHERE id = ?',
            [status, req.params.id]
        );

        res.json({ message: 'User status updated successfully.' });

    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Error updating user status.' });
    }
};

/* Delete User (Admin Only) */
exports.deleteUser = async (req, res) => {
    try {
        if (parseInt(req.params.id) === req.user.id) {
            return res.status(400).json({ message: 'You cannot delete your own account.' });
        }

        const [user] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [req.params.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        await db.query(
            'DELETE FROM users WHERE id = ?',
            [req.params.id]
        );

        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user.' });
    }
};

