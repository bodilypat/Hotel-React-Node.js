//src/controllers/room.constroller.js 

const roomService = require('../services/room.service');

// Create a new room
exports.createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);

        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            data: room,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create room',
            error: error.message,
        });
    }
};
// Get Available Rooms
exports.getAvailableRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAvailableRooms();

        res.status(200).json({
            success: true,
            message: 'Available rooms retrieved successfully',
            data: rooms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve available rooms',
            error: error.message,
        });
    }
};

// Get Room Details
exports.getRoomDetails = async (req, res) => {
    try {
        const room = await roomService.getRoomDetails(req.params.id);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Room details retrieved successfully',
            data: room,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve room details',
            error: error.message,
        });
    }
};

// Update Room Information
exports.updateRoom = async (req, res) => {
    try {
        const updatedRoom = await roomService.updateRoom(req.params.id, req.body);
        if (!updatedRoom) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: updatedRoom,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update room',
            error: error.message,
        });
    }
};

// Delete a Room
exports.deleteRoom = async (req, res) => {
    try {
        const deleted = await roomService.deleteRoom(req.params.id);    
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Room deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete room',
            error: error.message,
        });
    }
};


