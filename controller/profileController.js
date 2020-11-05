const { Profile } = require('../models/Profile');
const { Profesi } = require('../models/Profesi');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    addDataProfile: async (req, res) => {
        try {
            const { userId, price, description, timeAvailable, startDateAvailable, endDateAvailable, 
                locationId, experience, profesiId, serviceId } = req.body;
                const profesi = await Profesi.findOne({ _id: profesiId })
            const newProfile = { 
                userId, price, description, timeAvailable, startDateAvailable, endDateAvailable,
                locationId, experience, profesiId, serviceId 
            }

            const profile = await Profile.create(newProfile);
            profesi.profileId.push({ _id: profile._id })
            await profesi.save();
            res.json({
                message: 'succees Add Data Profile',
                profile
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`)
        }
    },
    viewAllDataProfile: async (req, res) => {
        const profile = await Profile.find().populate(
            { path: 'userId locationId profesiId serviceId', select: 'fullName role nameLocation nameProfesi nameService' }
        );
        try {
            res.json({
                message: 'Success View All Data profile',
                profile
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
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
            res.status(400).send(`Data is ${error}`);
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
    //         res.status(400).send(`Data is ${error}`);
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