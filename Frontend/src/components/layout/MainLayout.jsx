//src/components/layout/MainLayout.jsx

import React from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
export default MainLayout;



