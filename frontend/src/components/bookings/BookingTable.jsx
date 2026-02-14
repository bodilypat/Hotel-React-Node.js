//src/components/booking/BookingTable.jsx 

import React from 'react';

const BookingTable = ({ bookings, onEdit, onDelete, onView }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Guest</th>
                    <th>Room Number</th>
                    <th>Room Type</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.guestName}</td>
                        <td>{booking.roomNumber}</td>
                        <td>{booking.roomType}</td>
                        <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                        <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                        <td>{booking.status}</td>
                        <td>
                            <button className="btn btn-sm btn-primary me-2" onClick={() => onView(booking)}>View</button>
                            <button className="btn btn-sm btn-secondary me-2" onClick={() => onEdit(booking)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(booking.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookingTable;
    