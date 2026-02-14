//src/pages/Reports.jsx 

import StatCard from "../components/reports/StatCard";
import RevenueChart from "../components/reports/RevenueChart";
import OccupancyChart from "../components/reports/OccupancyChart";
import { useState, useEffect } from "react";

const Reports = () => {
    const [data, setData] = useState({
        totalRevenue: 0,
        totalBookings: 0,
        occupiedRooms: 0,
        availableRooms: 0,
        occupancyRate: 0,
        revenueByMonth: [],
        occupancyByMonth: []
    });

    useEffect(() => {
        // Fetch report data from backend API
        const ReportData = async () => {
            try {
                const response = await fetch("/api/reports/summary");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching report data:", error);
            }
        };
        ReportData();
    }, []);


    return (
        <div className="reports-page">
            <h1>Hotel Performance Reports</h1>
            <div className="stats-cards">
                <StatCard title="Total Revenue" value={`$${data.totalRevenue}`} />
                <StatCard title="Total Bookings" value={data.totalBookings} />
                <StatCard title="Occupied Rooms" value={data.occupiedRooms} />
                <StatCard title="Available Rooms" value={data.availableRooms} />
                <StatCard title="Occupancy Rate" value={`${data.occupancyRate}%`} />
            </div>
            <div className="charts">
                <RevenueChart data={data.revenueByMonth} />
                <OccupancyChart data={data.occupancyByMonth} />
            </div>
        </div>
    );
};

export default Reports;

