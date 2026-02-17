//src/components/layout/Sidebar.jsx 

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/rooms">Rooms</Link></li>
                <li><Link to="/bookings">Bookings</Link></li>
                <li><Link to="/billing">Billing</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
