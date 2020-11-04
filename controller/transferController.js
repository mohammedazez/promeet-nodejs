const {Transfer} = require('../models/Transfer');

module.exports = {
    addTransfer : async(req, res) => {
        const transfer = await Transfer.create();
        try {
            res.json({
                message: 'Success Add Data Transfer',
                transfer
            });
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
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
            res.status(500).send(`Data is ${error}`);
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
            res.status(500).send(`Data is ${error}`);
        }
    },
    
}