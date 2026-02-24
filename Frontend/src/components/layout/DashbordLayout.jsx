//src/components/layout/DashboardLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
        <header className="dashboard-header">
            <h1>Dashboard</h1>
        </header>
        <main className="dashboard-content">
            <Outlet />
        </main>
    </div>
    );
};

export default DashboardLayout;


