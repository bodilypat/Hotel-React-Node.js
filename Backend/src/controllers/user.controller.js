//src/controllers/user.controller.js 

const userService = require('../services/user.service');
//Create User 
exports.createUser = (req, res) => {
    try {
        const user = userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
};

// Get All Users
exports.getAllUsers = (req, res) => {
    try {
        const users = userService.getAllUsers();

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error: error.message
        });
    }
};

// Get User by ID
exports.getUserById = (req, res) => {
    try {
        const user = userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error: error.message
        });
    }
};

// Update User
exports.updateUser = (req, res) => {
    try {
        const updatedUser = userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) { 
        res.status(500).json({
        success: false,
        message: 'Failed to update user',
        error: error.message
        });
    }
};


// Delete User
exports.deleteUser = (req, res) => {
    try {
        const deletedUser = userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
};


