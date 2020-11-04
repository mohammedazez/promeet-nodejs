const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    timeAvailable : {
        type: String,
        required: true
    },
    StartDateAvailable : {
        type: Date,
        required: true
    },
    EndDateAvailable : {
        type: Date,
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locations'
    },
    experience: [{
        nameExperience : String,
        yearExperience: String
    }],
    profesiId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professions'
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services'
    }
});

const Profile = new mongoose.model('profiles', profileSchema);
module.exports = {Profile};