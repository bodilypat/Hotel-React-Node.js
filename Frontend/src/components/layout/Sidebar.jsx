//src/components/layout/Sidebar.jsx

import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Admin Panel</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/admin/rooms">Rooms</NavLink></li>
                    <li><NavLink to="/admin/bookings">Guests</NavLink></li>
                    <li><NavLink to="/admin/customers">Reservations</NavLink></li>
                    <li><NavLink to="/admin/reports">Payment</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;


