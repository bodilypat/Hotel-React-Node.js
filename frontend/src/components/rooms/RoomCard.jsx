//src/components/rooms/RoomCard.jsx 

import React from 'react';

const RoomCard = ({ room }) => {
    return (
        <div className="room-card" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
            <h3>{room.type}</h3>
            <p><strong>Room No:</strong> {room.roomNo}</p>
            <p><strong>Price:</strong> ${room.price} per night</p>
            <p><strong>Facilities:</strong> {room.facilities.join(', ')}</p>
            <p><strong>Availability:</strong> {room.availability ? 'Available' : 'Not Available'}</p>
            <p><strong>Status:</strong> {room.status}</p>
        </div>
    );
};

export default RoomCard;


