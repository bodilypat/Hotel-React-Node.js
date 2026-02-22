//src/controllers/guest.controller.js 

const guestService = require('../services/guest.service');

//create a new guest
exports.createGuest = async (req, res) => {
    try {
        const guest = await guestService.createGuest(req.body);
        res.status(201).json({
            success: true,
            data: guest
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
};

//get all guests
exports.getAllGuests = async (req, res) => {
    try {
        const guests = await guestService.getAllGuests();
        res.status(200).json({
            success: true,
            data: guests
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
};

//get a guest by id
exports.getGuestById = async (req, res) => {
    try {
        const guest = await guestService.getGuestById(req.params.id);
        if (!guest) {
            return res.status(404).json({
                success: false,
                message: 'Guest not found'
            });
        }
        res.status(200).json({
            success: true,
            data: guest
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
};

//update a guest
exports.updateGuest = async (req, res) => {
    try {
        const guest = await guestService.updateGuest(req.params.id, req.body);
        if (!guest) {
            return res.status(404).json({
                success: false,
                message: 'Guest not found'
            });
        }
        res.status(200).json({
            success: true,
            data: guest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//delete a guest
exports.deleteGuest = async (req, res) => {
    try {
        const guest = await guestService.deleteGuest(req.params.id);
        if (!guest) {
            return res.status(404).json({
                success: false,
                message: 'Guest not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Guest deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


