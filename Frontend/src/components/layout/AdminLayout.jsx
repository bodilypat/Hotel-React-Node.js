//src/components/layoutAdminLayout.jsx

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="content-area">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default AdminLayout;


