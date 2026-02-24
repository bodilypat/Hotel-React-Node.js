//controllers/reservationController.js 

const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        await Room.findByIdAndUpdate(reservation.room, { status: 'Occupied' });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        res.json(await Reservation.find().populate('guest').populate('room'));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('guest').populate('room');
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        await Room.findByIdAndUpdate(reservation.room, { status: 'Available' });
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

