const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    imgUrl : {
        type: String,
    },
    imgKtp :{
        type: String,
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
        type: Date,
        required: true
    },
    startDateAvailable : {
        type: Date,
    },
    endDateAvailable : {
        type: Date,
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