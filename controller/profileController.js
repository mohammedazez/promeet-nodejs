const { Profile } = require('../models/Profile');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    addDataProfile: async (req, res) => {
        const profile = await Profile.create(req.body);
        try {
            res.json({
                message: 'succees Add Data Profile',
                profile
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`)
        }
    },
    viewAllDataProfile: async (req, res) => {
        const profile = await Profile.find().populate(
            { path: 'userId locationId profesiId serviceId', select: 'fullName' }
        );
        try {
            res.json({
                message: 'Success View All Data profile',
                profile
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
        }
    },
    viewDataProfileById: async (req, res) => {
        const profile = await Profile.findById(req.params.id);
        try {
            res.json({
                message: 'Success View All Data profile',
                profile
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`);
        }
    },
    // editDataProfile: async (req, res) => {
    //     const profile = await Profile.find().populate(
    //         { path: 'userId locationId profesiId serviceId', select: 'fullName' }
    //     );
    //     try {
    //         res.json({
    //             message: 'Success View All Data profile',
    //             profile
    //         })
    //     } catch (error) {
    //         res.status(500).send(`Data is ${error}`);
    //     }
    // }
}

// userId
// price
// description
// timeAvailable
// StartDateAvailable
// EndDateAvailable
// locationId
// experience
// profesiId
// serviceId