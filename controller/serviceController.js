const {Service} = require('../models/Service');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    addDataService: async(req, res) => {
        const service = await Service.create(req.body);
        try {
            res.json({
                message: 'Success Add Data Service',
                service,
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    viewAllDataService: async(req, res) => {
        const service = await Service.find();
        try {
            res.json({
                message: 'Success View All Data service',
                service,
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    viewDataServiceById: async(req, res) => {
        const service = await Service.findById(req.params.id);
        try {
            res.json({
                message: 'Success View Data service By Id',
                service,
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    editDataService: async(req, res) => {
        const service = await Service.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set:{
                    nameService: req.body.nameService
                }
            }
        );
        try {
            res.json({
                message: 'Success Edit Data Service',
                service
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    deleteDataService: async(req, res) => {
        await Service.findByIdAndRemove(req.params.id);
        try {
            res.json({
                message: 'Success Delete'
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    }
}