//src/pages/rooms/Room.jsx 

import React, { useState } from 'react';
import RoomForm from '../components/rooms/RoomForm';
import RoomTable from '../components/rooms/RoomTable';
import RoomCard from '../components/rooms/RoomCard';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleAddOrUpdateRoom = (room) => {
        if (selectedRoom) {
            setRooms(rooms.map(r => r.id === room.id ? room : r));
            setSelectedRoom(null);
        } else {
            setRooms([...rooms, { ...room, id: Date.now() }]);
        }
    };

    const handleEditRoom = (room) => {
        setSelectedRoom(room);
    };

    const handleDeleteRoom = (index) => {
        setRooms(rooms.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Rooms Management</h1>
            <RoomForm onSubmit={handleAddOrUpdateRoom} selectedRoom={selectedRoom} />

            <RoomTable rooms={rooms} onEdit={handleEditRoom} onDelete={handleDeleteRoom} />
            <h2>Room Cards</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </div>
    );
};

export default Rooms;


