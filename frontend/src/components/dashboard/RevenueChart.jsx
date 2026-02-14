//src/components/dashboard/RevenueChart.jsx 

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4000 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 7000 },
];

const RevenueChart = () => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <h3>Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>  
        </div>
    );
};

export default RevenueChart;
