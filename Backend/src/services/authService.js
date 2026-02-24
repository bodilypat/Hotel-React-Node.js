//src/services/auth.service.js 

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_token_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret";

exports.validateUser = async (username, password) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [email]);
    if (rows.length === 0) {
        return null;
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return null;
    }

    return user;
};

exports.generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

exports.saveRefreshToken = async (userId, refreshToken) => {
    await db.query("INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)", [userId, refreshToken]);
};

exports.verifyRefreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        const [rows] = await db.query("SELECT * FROM refresh_tokens WHERE token = ?", [token]);
        if (rows.length === 0) {
            return null;
        }
        return decoded;
    } catch (err) {
        return null;
    }   
};

exports.deleteRefreshToken = async (token) => {
    await db.query("DELETE FROM refresh_tokens WHERE token = ?", [token]);
};

