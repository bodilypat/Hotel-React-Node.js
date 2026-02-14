//src/components/rooms/RoomTable.jsx 

import React from 'react';

const RoomTable = ({ rooms, onEdit, onDelete }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Room Number</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map((room) => (
                    <tr key={room._id}>
                        <td>{room.roomNumber}</td>
                        <td>{room.type}</td>
                        <td>${room.price}</td>
                        <td>{room.status}</td>
                        <td>
                            <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(room)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(room._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

