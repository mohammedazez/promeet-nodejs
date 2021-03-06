const {Booking} = require('../models/Booking');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    addDataBooking: async(req, res) => {
        const booking = await Booking.create(req.body)
        ;
        try {
            res.json({
                message: 'Success Add Data Booking',
                booking
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    viewAllDataBooking: async(req, res) => {
        const booking = await Booking.find()
        .populate({path: ' userId profileId transferId', select: 'fullName _id  price nameMethod',
        populate : {
            path: 'userId profesiId',
            select: 'fullName role nameProfesi'
        }
    });
        try {
            res.json({
                message: 'Success View All Data Booking',
                booking
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    viewDataBookingById: async(req, res) => {
        const booking = await Booking.findById(req.params.id)
        .populate({path: ' userId profileId transferId', select: 'fullName _id  price nameMethod',
        populate : {
            path: 'userId profesiId',
            select: 'fullName role nameProfesi'
        }
    });
        try {
            res.json({
                message: 'Success View Data Booking By Id',
                booking
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    editDataBooking: async(req, res) => {
        const booking = await Booking.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set:{
                    // codeInvoice: req.body.codeInvoice,
                    // userId: req.body.userId,
                    // transferId: req.body.transferId,
                    // duration: req.body.duration,
                    // total: req.body.total,
                    status: req.body.status
                }
            }
        );
        try {
            res.json({
                message: 'Success Edit Data Booking',
                booking
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    deleteDataBooking: async(req, res) => {
        await Booking.findByIdAndRemove();
        try {
            res.json({
                message: 'Success Delete'
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    }
}