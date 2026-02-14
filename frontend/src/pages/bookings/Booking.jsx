//src/pages/booking/Bookings.jsx 

import React, { useState } from 'react';
import BookingForm from '../components/bookings/BookingForm';
import BookingTable from '../components/bookings/BookingTable';
import BookingCalendar from '../components/bookings/BookingCalendar';
import BookingDetailsModal from '../components/bookings/BookingDetailsModal';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [viewBooking, setViewBooking] = useState(false);

    const handleAddOrUpdateBooking = (booking) => {
        if (selectedBooking) {
            setBookings(bookings.map(b => b.id === booking.id ? booking : b));
        } else {
            setBookings([...bookings, { ...booking, id: Date.now() }]);
        }
        setSelectedBooking(null);
    };
  
    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setViewBooking(true);
    };

    const handleDeleteBooking = (id) => {
        setBookings(bookings.filter(b => b.id !== id));
    };

    return (
        <div className="bookings-container">
            <h1>Bookings</h1>
            <BookingForm onSubmit={handleAddOrUpdateBooking} initialData={selectedBooking} />
            <BookingTable bookings={bookings} onEdit={handleEditBooking} onDelete={handleDeleteBooking} />
            <BookingCalendar bookings={bookings} />
            {viewBooking && selectedBooking && (
                <BookingDetailsModal booking={selectedBooking} onClose={() => setViewBooking(false)} />
            )}
        </div>
    );
};

export default Bookings;

    
