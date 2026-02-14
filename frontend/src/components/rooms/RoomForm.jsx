//src/components/rooms/RoomForm.jsx 

import React, { useState, useEffect } from 'react';

const RoomCard = ({ onSubmit, selectedRoom }) => {
    const [room, setRoom] = useState({
        roomNumber: '',
        type: '',
        price: '',
        availability: true,
    });

    useEffect(() => {
        if (selectedRoom) {
            setRoom(selectedRoom);
        }
    }, [selectedRoom]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom((prevRoom) => ({
            ...prevRoom,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(room);
        setRoom({
            roomNumber: '',
            type: '',
            price: '',
            availability: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <div>
                <label>Room Number:</label>
                <input
                    type="text"
                    name="roomNumber"
                    value={room.roomNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={room.type}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={room.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Availability:</label>
                <input
                    type="checkbox"
                    name="availability"
                    checked={room.availability}
                    onChange={(e) => handleChange({ target: { name: 'availability', value: e.target.checked } })}
                />
            </div>
            <button type="submit">{selectedRoom ? 'Update Room' : 'Add Room'}</button>
        </form>
    );
};


    