const {Transfer} = require('../models/Transfer');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    addDataTransfer : async(req, res) => {
        const transfer = await Transfer.create(req.body);
        try {
            res.json({
                message: 'Success Add Data Transfer',
                transfer
            });
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    viewAllDataTransfer: async(req, res) => {
        const transfer = await Transfer.find();
        try {
            res.json({
                message: 'Success View All Data Transfer',
                transfer
            });
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    ViewDataTransferById: async(req, res) => {
        const transfer = await Transfer.findById(req.params.id);
        try {
            res.json({
                message: 'Success View Data Transfer By Id',
                transfer
            });
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    editDataTransfer: async(req, res) => {
        const transfer = await Transfer.findByIdAndUpdate(
            {_id : req.params.id},
            {
                $set : {
                    nameMethod: req.body.nameMethod,
                    numberRek: req.body.numberRek
                }
            }
        )
        try {
            res.json({
                message: 'Success Edit Data Transfer',
                transfer
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    deleteDataTransfer : async(req, res) => {
        await Transfer.findByIdAndRemove(req.params.id);
        try {
            res.json({
                message: 'Success Delete'
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    }
}