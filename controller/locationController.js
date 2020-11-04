const {Location} = require('../models/Location');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    addDataLocation: async(req, res) => {
        const location = await Location.create(req.body);
        try {
            res.json({
                message: 'Success Add Data Location',
                location,
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
        }
    },
    viewAllDataLocation: async(req, res) => {
        const location = await Location.find();
        try {
            res.json({
                message: 'Success View All Data Location',
                location,
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
        }
    },
    viewDataLocationById: async(req, res) => {
        const location = await Location.findById(req.params.id);
        try {
            res.json({
                message: 'Success View Data Location By Id',
                location,
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
        }
    },
    editDataLocation: async(req, res) => {
        const location = await Location.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set:{
                    nameLocation: req.body.nameLocation
                }
            }
        );
        try {
            res.json({
                message: 'Success Edit Data Location',
                location
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
        }
    },
    deleteDataLocation: async(req, res) => {
        await Location.findByIdAndRemove(req.params.id);
        try {
            res.json({
                message: 'Success Delete'
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
        }
    }
}