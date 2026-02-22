//src/controllers/reservation.controller.js 

const ReservationService = require('../services/reservation.service');

//Create Reservation
exports.createReservation = async (req, res) => {
    try {
        const reservation = await ReservationService.createReservation(req.body);

        res.status(201).json({
            success: true,
            message: 'Reservation created successfully',
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create reservation',
            error: error.message
        });
    }
};

//Get All Reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await ReservationService.getAllReservations();

        res.status(200).json({
            success: true,
            message: 'Reservations retrieved successfully',
            data: reservations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve reservations',
            error: error.message
        });
    }
};


//Get Reservation by ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await ReservationService.getReservationById(req.params.id);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Reservation retrieved successfully',
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve reservation',
            error: error.message
        });
    }
};

//Update Reservation
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await ReservationService.updateReservation(req.params.id, req.body);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Reservation updated successfully',
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update reservation',
            error: error.message
        });
    }
};

//Delete Reservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await ReservationService.deleteReservation(req.params.id);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Reservation deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete reservation',
            error: error.message
        });
    }
};

