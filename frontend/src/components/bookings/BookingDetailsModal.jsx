//src/components/booking/BookingDetailsModal.jsx 

import React from 'react';

const BookingDetailsModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Booking Details</h2>
                <p><strong>Guest:</strong> {booking.guestName}</p>
                <p><strong>Room:</strong> {booking.roomNumber}</p>
                <p><strong>Check-in:</strong> {booking.checkIn}</p>
                <p><strong>Check-out:</strong> {booking.checkOut}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export default BookingDetailsModal;



