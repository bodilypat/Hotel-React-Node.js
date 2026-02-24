//src/pages/AdminLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminLogin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // replace with backend later 
        if (email === 'sunshine@hotel.com' && password === 'sunshine12812') {
            localStorage.setItem('adminAuth', 'true');
            navigate('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="admin-login-container">
            <form className="admin-login-form" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter admin email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;

