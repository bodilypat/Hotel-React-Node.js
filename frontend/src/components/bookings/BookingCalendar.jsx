//src/compoments/booking/BookingCalendar.jsx 

import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const BookingCalendar = ({ bookings }) => {
    const events = bookings.map((booking) => ({
        title: `Booking #${booking.id}`,
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
    }));

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
            />
        </div>
    );
};
export default BookingCalendar;
