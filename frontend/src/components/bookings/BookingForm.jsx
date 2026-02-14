//src/components/booking/BookingForm.jsx 

import React, { useState, useEffect } from 'react';

const BookingForm = ({ onSubmit, selectedBooking }) => {
    const [booking, setBooking] = useState({
        guestName: '',
        roomNumber: '',
        checkInDate: '',
        checkOutDate: '',
        status: "Confirmed"
    });

    useEffect(() => {
        if (selectedBooking) {
            setBooking(selectedBooking);
        }
    }, [selectedBooking]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(booking);
        setBooking({
            guestName: '',
            roomNumber: '',
            checkInDate: '',
            checkOutDate: '',
            status: "Confirmed"
        });
    };

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <h2>{selectedBooking ? 'Edit Booking' : 'Add Booking'}</h2>
            <div>
                <label>Guest Name:</label>
                <input type="text" name="guestName" value={booking.guestName} onChange={handleChange} required />
            </div>
            <div>
                <label>Room Number:</label>
                <input type="text" name="roomNumber" value={booking.roomNumber} onChange={handleChange} required />
            </div>
            <div>
                <label>Check-In Date:</label>
                <input type="date" name="checkInDate" value={booking.checkInDate} onChange={handleChange} required />
            </div>
            <div>
                <label>Check-Out Date:</label>
                <input type="date" name="checkOutDate" value={booking.checkOutDate} onChange={handleChange} required />
            </div>
            <div>
                <label>Status:</label>
                <select name="status" value={booking.status} onChange={handleChange}>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <button type="submit">{selectedBooking ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default BookingForm;

