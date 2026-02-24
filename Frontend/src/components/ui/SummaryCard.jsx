//src/components/ui/SummaryCard.jsx 

import React from 'react';
import PropTypes from 'prop-types';

/*  
    * SummaryCard component
    * Reusable dashboard card for showing metrics like:
    * Total Rooms, Booked Rooms, Available Rooms, Total Revenue, etc.
    * Props:
    * - title: string (e.g., "Total Rooms")
    * - value: string or number (e.g., "150" or "$10,000")
    * - color: string (Bootstrap background color: primary, success, warning, danger, info, light, dark) - optional for styling
    * 
 */

function SummaryCard({ title, value, color = 'primary' }) {
    return (
        <div className={`card text-white bg-${color} mb-3`} style={{ maxWidth: '18rem' }}>
            <div className="card-header">{title}</div>
            <div className="card-body">
                <h5 className="card-title">{value}</h5>
            </div>
        </div>
    );
};

SummaryCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string
};

export default SummaryCard;
