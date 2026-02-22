//src/controller/payment.controller.js 
const paymentService = require('../services/payment.service');

// Create Payment
exports.createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.status(201).json({
            success: true,
            message: 'Payment created successfully',
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create payment',
            error: error.message
        });
    }
};

// Get All Payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({
            success: true,
            data: payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }
        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Payment
exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }
        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Payment
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Payment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

