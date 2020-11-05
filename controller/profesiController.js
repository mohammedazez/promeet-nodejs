const { Profesi } = require('../models/Profesi');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    addDataProfesi: async (req, res) => {
        const profesi = await Profesi.create(req.body);
        try {
            res.json({
                message: 'Success Add Data Profesi',
                profesi
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    viewAllDataProfesi: async (req, res) => {
        const profesi = await Profesi.find()
        try {
            res.json({
                message: 'Success View All Data Profesi',
                profesi
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`)
        }
    },

    viewDataProfesiById: async (req, res) => {
        const profesi = await Profesi.findById(req.params.id)
        .select('_id nameProfesi').populate(
            {path: 'profileId', select: 'price startDateAvailable',
            populate: {path: 'userId locationId', select: 'fullName nameLocation'}
        }
            
            );
        try {
            res.json({
                message: 'Success View Data Profesi by Id',
                profesi
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },
    editDataProfesi: async (req, res) => {
        const profesi = await Profesi.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    nameProfesi: req.body.nameProfesi,
                    imgUrl: req.body.imgUrl,
                    profileId: req.body.profileId
                }
            }
        )
        try {
            res.json({
                message: 'Success Edit Data Transfer',
                profesi
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`)
        }
    },
    deleteDataProfesi: async (req, res) => {
        await Profesi.findByIdAndRemove(req.params.id);
        try {
            res.json({
                message: 'Success Delete'
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`)
        }
    }

}