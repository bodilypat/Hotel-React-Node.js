//src/app.js 

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/rooms', require('./routes/rooms.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/payments', require('./routes/payment.routes'));

module.exports = app;


