//src/controllers/auth.controller.js 

const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || " access_secret_key";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key";

const ACCESS_TOKEN_EXPIRY = "15m"; 
const REFRESH_TOKEN_EXPIRY = "7d";

/* Generate Tokens */
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email }, 
        ACCESS_TOKEN_SECRET, 
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
};

/* Register User */
exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
        const userId = result.insertId;
        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/* Login User */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = users[0];

        if (user.status !== "active") {
            return res.status(403).json({ message: "Account is not active" });
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in DB 
        await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [refreshToken, user.id]);
        res.json({ 
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/* Refresh Access Token */
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        // Check token in DB 
        const [users] = await db.query("SELECT * FROM users WHERE refresh_token = ?", [refreshToken]);

        if (users.length === 0) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            const accessToken = generateAccessToken(user);
            res.json({ accessToken });
        });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/* Logout User */
exports.logout = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        await db.query(
            "DELETE FROM users WHERE refresh_token = ?", 
            [refreshToken]
        );
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

