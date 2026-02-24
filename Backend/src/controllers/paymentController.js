//controllers/paymentController.js 

const Payment = require('../models/Payment');
const Reservation = require('../models/Reservation');

exports.createPayment = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        if (payment.status === 'Completed') {
            await Reservation.findByIdAndUpdate(payment.reservation, { status: 'Checked-in' });
        }
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
        }
};

exports.getPayments = async (req, res) => {
    try {
        res.json(await Payment.find().populate('reservation'));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('reservation');
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        if (payment.status === 'Completed') {
            await Reservation.findByIdAndUpdate(payment.reservation, { status: 'Checked-in' });
        }
        res.json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        res.json({ message: 'Payment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


